import type { APIRoute } from 'astro';
import {
  checkLoginRateLimit,
  claimInitialAdminPassword,
  clearFailedLoginAttempts,
  getClientKey,
  issueAdminToken,
  recordFailedLoginAttempt,
} from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const clientKey = getClientKey(request);
  const rate = checkLoginRateLimit(clientKey);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({ error: `Too many attempts. Try again in ${rate.retryAfterSec}s.` }),
      { status: 429, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } }
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
  const result = claimInitialAdminPassword(password);
  if (!result.ok) {
    recordFailedLoginAttempt(clientKey);
    const status = result.error?.includes('already') ? 403 : 400;
    return new Response(JSON.stringify({ error: result.error }), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  clearFailedLoginAttempts(clientKey);
  const token = issueAdminToken();
  return new Response(JSON.stringify({ token }), {
    status: 201,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
