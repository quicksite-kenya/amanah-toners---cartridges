import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initialProducts, type Product } from '../data/products';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'amanah.db');

type GlobalWithDb = typeof globalThis & {
  __amanahDb?: DatabaseSync;
};

function getDb(): DatabaseSync {
  const g = globalThis as GlobalWithDb;
  if (g.__amanahDb) {
    return g.__amanahDb;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL;');

  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      category TEXT NOT NULL,
      partNumber TEXT,
      compatiblePrinters TEXT,
      imageUrl TEXT NOT NULL,
      description TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      inquiryOnly INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_config (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      organization TEXT,
      subject TEXT,
      message TEXT,
      itemsJson TEXT,
      createdAt TEXT NOT NULL
    );
  `);

  const countRow = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (countRow.count === 0) {
    const now = new Date().toISOString();
    const insertStmt = db.prepare(`
      INSERT INTO products (
        id, slug, brand, model, category, partNumber, compatiblePrinters,
        imageUrl, description, stock, inquiryOnly, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of initialProducts) {
      insertStmt.run(
        p.id,
        p.slug,
        p.brand,
        p.model,
        p.category,
        p.partNumber || '',
        p.compatiblePrinters || '',
        p.imageUrl,
        p.description,
        p.stock,
        p.inquiryOnly ? 1 : 0,
        now,
        now
      );
    }
  }

  g.__amanahDb = db;
  return db;
}

interface ProductRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  partNumber: string | null;
  compatiblePrinters: string | null;
  imageUrl: string;
  description: string;
  stock: number;
  inquiryOnly: number;
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    category: row.category,
    partNumber: row.partNumber || undefined,
    compatiblePrinters: row.compatiblePrinters || undefined,
    imageUrl: row.imageUrl,
    description: row.description,
    stock: row.stock,
    inquiryOnly: Boolean(row.inquiryOnly),
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getAllProducts(): Product[] {
  const db = getDb();
  const rows = db
    .prepare('SELECT id, slug, brand, model, category, partNumber, compatiblePrinters, imageUrl, description, stock, inquiryOnly FROM products ORDER BY rowid ASC')
    .all() as unknown as ProductRow[];
  return rows.map(mapRow);
}

export function getProductBySlug(slug: string): Product | null {
  const db = getDb();
  const row = db
    .prepare('SELECT id, slug, brand, model, category, partNumber, compatiblePrinters, imageUrl, description, stock, inquiryOnly FROM products WHERE slug = ?')
    .get(slug) as unknown as ProductRow | undefined;
  return row ? mapRow(row) : null;
}

export function getProductById(id: string): Product | null {
  const db = getDb();
  const row = db
    .prepare('SELECT id, slug, brand, model, category, partNumber, compatiblePrinters, imageUrl, description, stock, inquiryOnly FROM products WHERE id = ?')
    .get(id) as unknown as ProductRow | undefined;
  return row ? mapRow(row) : null;
}

export function getProductsByBrandSlug(brandSlug: string): { brand: string | null; products: Product[] } {
  const all = getAllProducts();
  const matched = all.filter((p) => slugify(p.brand) === brandSlug.toLowerCase());
  return {
    brand: matched.length > 0 ? matched[0].brand : null,
    products: matched,
  };
}

export function getProductsByCategorySlug(categorySlug: string): { category: string | null; products: Product[] } {
  const all = getAllProducts();
  const matched = all.filter((p) => slugify(p.category) === categorySlug.toLowerCase());
  return {
    category: matched.length > 0 ? matched[0].category : null,
    products: matched,
  };
}

export interface ProductInput {
  brand: string;
  model: string;
  category: string;
  partNumber?: string;
  compatiblePrinters?: string;
  imageUrl: string;
  description: string;
  stock: number;
}

function ensureUniqueSlug(db: DatabaseSync, baseSlug: string, excludeId?: string): string {
  const cleanBase = baseSlug || 'product';
  let candidate = cleanBase;
  let counter = 2;
  while (true) {
    const existing = excludeId
      ? (db.prepare('SELECT id FROM products WHERE slug = ? AND id != ?').get(candidate, excludeId) as { id: string } | undefined)
      : (db.prepare('SELECT id FROM products WHERE slug = ?').get(candidate) as { id: string } | undefined);
    if (!existing) return candidate;
    candidate = `${cleanBase}-${counter}`;
    counter++;
  }
}

export function createProduct(input: ProductInput): Product {
  const db = getDb();
  const id = 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
  const slug = ensureUniqueSlug(db, slugify(input.model));
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO products (
      id, slug, brand, model, category, partNumber, compatiblePrinters,
      imageUrl, description, stock, inquiryOnly, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
  `).run(
    id,
    slug,
    input.brand,
    input.model,
    input.category,
    input.partNumber || '',
    input.compatiblePrinters || '',
    input.imageUrl,
    input.description,
    input.stock,
    now,
    now
  );

  return getProductById(id)!;
}

export function updateProduct(id: string, input: ProductInput): Product | null {
  const db = getDb();
  const existing = getProductById(id);
  if (!existing) return null;

  const slug = ensureUniqueSlug(db, slugify(input.model), id);
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE products
    SET slug = ?, brand = ?, model = ?, category = ?, partNumber = ?,
        compatiblePrinters = ?, imageUrl = ?, description = ?, stock = ?, updatedAt = ?
    WHERE id = ?
  `).run(
    slug,
    input.brand,
    input.model,
    input.category,
    input.partNumber || '',
    input.compatiblePrinters || '',
    input.imageUrl,
    input.description,
    input.stock,
    now,
    id
  );

  return getProductById(id);
}

export function deleteProduct(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return res.changes > 0;
}

export function getClaimedAdminHash(): string | null {
  const db = getDb();
  const row = db.prepare('SELECT passwordHash FROM admin_config WHERE id = 1').get() as { passwordHash: string } | undefined;
  return row ? row.passwordHash : null;
}

export function claimAdminPasswordHash(passwordHash: string): boolean {
  const db = getDb();
  const now = new Date().toISOString();
  const res = db
    .prepare('INSERT OR IGNORE INTO admin_config (id, passwordHash, createdAt) VALUES (1, ?, ?)')
    .run(passwordHash, now);
  return res.changes > 0;
}

export function recordInquiry(entry: {
  type: 'contact' | 'quote';
  name: string;
  phone: string;
  organization?: string;
  subject?: string;
  message?: string;
  items?: unknown[];
}): number {
  const db = getDb();
  const res = db
    .prepare(`
      INSERT INTO inquiries (type, name, phone, organization, subject, message, itemsJson, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      entry.type,
      entry.name,
      entry.phone,
      entry.organization || '',
      entry.subject || '',
      entry.message || '',
      entry.items ? JSON.stringify(entry.items) : '[]',
      new Date().toISOString()
    );
  return Number(res.lastInsertRowid);
}
