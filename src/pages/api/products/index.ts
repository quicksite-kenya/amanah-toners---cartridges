import type { APIRoute } from 'astro';
import { createProduct, getAllProducts } from '../../../lib/db';
import { isRequestAuthenticated, validateProductPayload } from '../../../lib/auth';

export const prerender = false;

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export const GET: APIRoute = async () => {
  try {
    const products = await getAllProducts();

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Product retrieval failed:', error);

    return new Response(JSON.stringify({ error: 'Unable to load products.' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: jsonHeaders,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request.' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const validated = validateProductPayload(body);
  if ('error' in validated) {
    return new Response(JSON.stringify({ error: validated.error }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  try {
    const created = await createProduct(validated.data);

    return new Response(JSON.stringify({ product: created }), {
      status: 201,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Product creation failed:', error);

    return new Response(JSON.stringify({ error: 'Unable to create product.' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};
