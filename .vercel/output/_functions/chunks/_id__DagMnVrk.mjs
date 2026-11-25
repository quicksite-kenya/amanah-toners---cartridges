import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { r as deleteProduct, u as updateProduct } from "./db_8FjN3uWI.mjs";
import { l as validateProductPayload, o as isRequestAuthenticated } from "./auth_CDK90z6D.mjs";
// src/pages/api/products/[id].ts
var _id__exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PUT: () => PUT,
	prerender: () => false
});
var jsonHeaders = {
	"Content-Type": "application/json",
	"Cache-Control": "no-store"
};
var PUT = async ({ params, request }) => {
	if (!isRequestAuthenticated(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: jsonHeaders
	});
	const id = params.id;
	if (!id) return new Response(JSON.stringify({ error: "Missing product ID." }), {
		status: 400,
		headers: jsonHeaders
	});
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON request." }), {
			status: 400,
			headers: jsonHeaders
		});
	}
	const validated = validateProductPayload(body);
	if ("error" in validated) return new Response(JSON.stringify({ error: validated.error }), {
		status: 400,
		headers: jsonHeaders
	});
	try {
		const updated = await updateProduct(id, validated.data);
		if (!updated) return new Response(JSON.stringify({ error: "Product not found." }), {
			status: 404,
			headers: jsonHeaders
		});
		return new Response(JSON.stringify({ product: updated }), {
			status: 200,
			headers: jsonHeaders
		});
	} catch (error) {
		console.error("Product update failed:", error);
		return new Response(JSON.stringify({ error: "Unable to update product." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
};
var DELETE = async ({ params, request }) => {
	if (!isRequestAuthenticated(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: jsonHeaders
	});
	const id = params.id;
	if (!id) return new Response(JSON.stringify({ error: "Missing product ID." }), {
		status: 400,
		headers: jsonHeaders
	});
	try {
		if (!await deleteProduct(id)) return new Response(JSON.stringify({ error: "Product not found." }), {
			status: 404,
			headers: jsonHeaders
		});
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: jsonHeaders
		});
	} catch (error) {
		console.error("Product deletion failed:", error);
		return new Response(JSON.stringify({ error: "Unable to delete product." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
};
// \0virtual:astro:page:src/pages/api/products/[id]@_@ts
var page = () => _id__exports;
export { page };
