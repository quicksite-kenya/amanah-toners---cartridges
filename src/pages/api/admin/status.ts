import type { APIRoute } from 'astro';
import { isAdminConfigured, isRequestAuthenticated } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const envConfigured = Boolean(process.env.ADMIN_PASSCODE?.trim());
  const needsSetup = !isAdminConfigured();
  const authenticated = isRequestAuthenticated(request);

  return new Response(
    JSON.stringify({
      envConfigured,
      needsSetup,
      authenticated,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    }
  );
};
