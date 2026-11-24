import crypto from 'node:crypto';
import {
  claimAdminPasswordHash,
  getClaimedAdminHash,
  type ProductInput,
} from './db';

type GlobalWithAuth = typeof globalThis & {
  __amanahSessionSecret?: string;
  __amanahLoginAttempts?: Map<string, { count: number; resetAt: number }>;
};

function getSessionSecret(): string {
  const envSecret = process.env.SESSION_SECRET?.trim();

  if (envSecret && envSecret.length >= 32) {
    return envSecret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be configured with at least 32 characters in production.');
  }

  const g = globalThis as GlobalWithAuth;

  if (!g.__amanahSessionSecret) {
    g.__amanahSessionSecret = crypto.randomBytes(32).toString('hex');
  }

  return g.__amanahSessionSecret;
}

function getEnvAdminPasscode(): string | null {
  const val = process.env.ADMIN_PASSCODE?.trim();
  return val && val.length > 0 ? val : null;
}

function sha256Buffer(value: string): Buffer {
  return crypto.createHash('sha256').update(value, 'utf8').digest();
}

export function hashPasswordScrypt(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${derived}`;
}

export function verifyScryptHash(password: string, storedHash: string): boolean {
  const parts = storedHash.split(':');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;

  const [, salt, hexKey] = parts;
  const expected = Buffer.from(hexKey, 'hex');
  const actual = crypto.scryptSync(password, salt, 64);

  if (expected.length !== actual.length) return false;

  return crypto.timingSafeEqual(expected, actual);
}

export async function verifyAdminCredentials(password: string): Promise<boolean> {
  if (!password || typeof password !== 'string') return false;

  const envPass = getEnvAdminPasscode();

  if (envPass) {
    return crypto.timingSafeEqual(sha256Buffer(password), sha256Buffer(envPass));
  }

  const claimedHash = await getClaimedAdminHash();

  if (!claimedHash) return false;

  return verifyScryptHash(password, claimedHash);
}

export async function isAdminConfigured(): Promise<boolean> {
  if (getEnvAdminPasscode()) return true;

  return Boolean(await getClaimedAdminHash());
}

export async function claimInitialAdminPassword(
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (getEnvAdminPasscode()) {
    return { ok: false, error: 'Admin access is already configured.' };
  }

  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return { ok: false, error: 'Password must be between 8 and 128 characters.' };
  }

  try {
    const hash = hashPasswordScrypt(password);
    const inserted = await claimAdminPasswordHash(hash);

    if (!inserted) {
      return { ok: false, error: 'Admin access has already been claimed.' };
    }

    return { ok: true };
  } catch (error) {
    console.error('Initial admin setup failed:', error);
    return { ok: false, error: 'Unable to configure admin access right now.' };
  }
}

export function issueAdminToken(): string {
  const nowSec = Math.floor(Date.now() / 1000);

  const payload = {
    role: 'admin',
    iat: nowSec,
    exp: nowSec + 4 * 60 * 60,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');

  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${sig}`;
}

export function verifyAdminToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [encodedPayload, providedSig] = parts;
  if (!encodedPayload || !providedSig) return false;

  try {
    const expectedSig = crypto
      .createHmac('sha256', getSessionSecret())
      .update(encodedPayload)
      .digest('base64url');

    const a = Buffer.from(providedSig, 'utf8');
    const b = Buffer.from(expectedSig, 'utf8');

    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return false;
    }

    const decoded = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as { role?: string; exp?: number; iat?: number };

    const nowSec = Math.floor(Date.now() / 1000);

    return (
      decoded.role === 'admin' &&
      typeof decoded.exp === 'number' &&
      decoded.exp > nowSec &&
      typeof decoded.iat === 'number' &&
      decoded.iat <= nowSec
    );
  } catch {
    return false;
  }
}

export function extractBearerToken(request: Request): string | null {
  const auth = request.headers.get('authorization') || '';

  if (!auth.toLowerCase().startsWith('bearer ')) return null;

  return auth.slice(7).trim() || null;
}

export function isRequestAuthenticated(request: Request): boolean {
  return verifyAdminToken(extractBearerToken(request));
}

export function checkLoginRateLimit(
  clientKey: string
): { allowed: boolean; retryAfterSec?: number } {
  const g = globalThis as GlobalWithAuth;

  if (!g.__amanahLoginAttempts) {
    g.__amanahLoginAttempts = new Map();
  }

  const map = g.__amanahLoginAttempts;
  const now = Date.now();
  const existing = map.get(clientKey);

  if (!existing || existing.resetAt <= now) {
    return { allowed: true };
  }

  if (existing.count >= 10) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

export function recordFailedLoginAttempt(clientKey: string): void {
  const g = globalThis as GlobalWithAuth;

  if (!g.__amanahLoginAttempts) {
    g.__amanahLoginAttempts = new Map();
  }

  const map = g.__amanahLoginAttempts;
  const now = Date.now();
  const existing = map.get(clientKey);

  if (!existing || existing.resetAt <= now) {
    map.set(clientKey, { count: 1, resetAt: now + 15 * 60 * 1000 });
  } else {
    existing.count += 1;
  }
}

export function clearFailedLoginAttempts(clientKey: string): void {
  const g = globalThis as GlobalWithAuth;
  g.__amanahLoginAttempts?.delete(clientKey);
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return request.headers.get('x-real-ip') || 'local';
}

export function isSafeAssetPath(url: string): boolean {
  if (typeof url !== 'string') return false;

  const trimmed = url.trim();

  if (!trimmed.startsWith('/')) return false;
  if (trimmed.startsWith('//') || trimmed.includes('..') || trimmed.includes('\\')) return false;

  return trimmed === '/logo.png' || /^\/assets\/[a-zA-Z0-9._/-]+$/.test(trimmed);
}

const ALLOWED_CATEGORIES = new Set([
  'Toner Cartridges',
  'Ink Cartridges',
  'Printers',
  'Printer Accessories',
]);

export function validateProductPayload(
  raw: unknown
): { ok: true; data: ProductInput } | { ok: false; error: string } {
  if (!raw || typeof raw !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }

  const body = raw as Record<string, unknown>;

  const brand = typeof body.brand === 'string' ? body.brand.trim() : '';
  const model = typeof body.model === 'string' ? body.model.trim() : '';
  const category = typeof body.category === 'string' ? body.category.trim() : '';
  const partNumber = typeof body.partNumber === 'string' ? body.partNumber.trim().slice(0, 160) : '';
  const compatiblePrinters =
    typeof body.compatiblePrinters === 'string'
      ? body.compatiblePrinters.trim().slice(0, 400)
      : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';

  const rawImage =
    typeof body.imageUrl === 'string' && body.imageUrl.trim()
      ? body.imageUrl.trim()
      : '/assets/aistudio/WhatsApp_Image_2026-11-17_at_11.40.28_6b205af5.jpeg';

  const stockNum = typeof body.stock === 'number' ? body.stock : Number(body.stock);

  if (brand.length < 1 || brand.length > 60) {
    return { ok: false, error: 'Brand is required (1-60 characters).' };
  }

  if (model.length < 2 || model.length > 140) {
    return { ok: false, error: 'Model name is required (2-140 characters).' };
  }

  if (!ALLOWED_CATEGORIES.has(category)) {
    return { ok: false, error: 'Invalid product category.' };
  }

  if (!Number.isInteger(stockNum) || stockNum < 0 || stockNum > 100000) {
    return { ok: false, error: 'Stock must be a whole number between 0 and 100,000.' };
  }

  if (!isSafeAssetPath(rawImage)) {
    return {
      ok: false,
      error: 'Image path must point to a valid local /assets/... or /logo.png asset.',
    };
  }

  if (description.length > 1200) {
    return { ok: false, error: 'Description must be 1200 characters or fewer.' };
  }

  return {
    ok: true,
    data: {
      brand,
      model,
      category,
      partNumber,
      compatiblePrinters,
      imageUrl: rawImage,
      description,
      stock: stockNum,
    },
  };
}
