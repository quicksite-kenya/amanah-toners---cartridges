import type { APIRoute } from 'astro';
import { deleteProduct, updateProduct } from '../../../lib/db';
import { isRequestAuthenticated, validateProductPayload } from '../../../lib/auth';

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  const id = params.id;
  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing product ID.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
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

  const updated = updateProduct(id, validated.data);
  if (!updated) {
    return new Response(JSON.stringify({ error: 'Product not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ product: updated }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};

export const DELETE: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }

  const id = params.id;
  if (!id || typeof id !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing product ID.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const deleted = deleteProduct(id);
  if (!deleted) {
    return new Response(JSON.stringify({ error: 'Product not found.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
