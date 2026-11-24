import type { APIRoute } from 'astro';
import { deleteProduct, updateProduct } from '../../../lib/db';
import { isRequestAuthenticated, validateProductPayload } from '../../../lib/auth';

export const prerender = false;

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export const PUT: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: jsonHeaders,
    });
  }

  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing product ID.' }), {
      status: 400,
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
    const updated = await updateProduct(id, validated.data);

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Product not found.' }), {
        status: 404,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({ product: updated }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Product update failed:', error);
    return new Response(JSON.stringify({ error: 'Unable to update product.' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  if (!isRequestAuthenticated(request)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: jsonHeaders,
    });
  }

  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing product ID.' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  try {
    const deleted = await deleteProduct(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Product not found.' }), {
        status: 404,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('Product deletion failed:', error);
    return new Response(JSON.stringify({ error: 'Unable to delete product.' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};
