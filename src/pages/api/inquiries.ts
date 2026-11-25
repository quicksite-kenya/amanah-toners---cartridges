import type { APIRoute } from 'astro';
import { recordInquiry } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const type = body.type === 'contact' ? 'contact' : 'quote';
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '';
  const organization = typeof body.organization === 'string' ? body.organization.trim().slice(0, 160) : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 160) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1500) : '';
  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];

  if (name.length < 2 || phone.length < 6) {
    return new Response(JSON.stringify({ error: 'Valid name and phone number are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = await recordInquiry({
    type,
    name,
    phone,
    organization,
    subject,
    message,
    items,
  });

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
