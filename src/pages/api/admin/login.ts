import type { APIRoute } from 'astro';
import {
  checkLoginRateLimit,
  clearFailedLoginAttempts,
  getClientKey,
  isAdminConfigured,
  issueAdminToken,
  recordFailedLoginAttempt,
  verifyAdminCredentials,
} from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const clientKey = getClientKey(request);
  const rate = checkLoginRateLimit(clientKey);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many failed attempts. Please wait ${rate.retryAfterSec}s.` }),
      { status: 429, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  }

  if (!(await isAdminConfigured())) {
    return new Response(
      JSON.stringify({ error: 'Admin access has not been initialized yet.', needsSetup: true }),
      { status: 409, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
    );
  }

  let body: { password?: unknown } = {};
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!(await verifyAdminCredentials(password))) {
    recordFailedLoginAttempt(clientKey);
    return new Response(JSON.stringify({ error: 'Incorrect admin password.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  clearFailedLoginAttempts(clientKey);
  const token = issueAdminToken();
  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
