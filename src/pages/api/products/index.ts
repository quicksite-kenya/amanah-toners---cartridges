import type { APIRoute } from 'astro';
import { createProduct, getAllProducts } from '../../../lib/db';
import { isRequestAuthenticated, validateProductPayload } from '../../../lib/auth';

export const prerender = false;

export const GET: APIRoute = async () => {
  const products = await getAllProducts();
  return new Response(JSON.stringify({ products }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const validated = validateProductPayload(body);
  if ('error' in validated) {
    return new Response(JSON.stringify({ error: validated.error }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const created = await createProduct(validated.data);
  return new Response(JSON.stringify({ product: created }), {
    status: 201,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
