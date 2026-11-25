import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { i as getAllProducts, n as createProduct } from "./db_8FjN3uWI.mjs";
import { l as validateProductPayload, o as isRequestAuthenticated } from "./auth_CDK90z6D.mjs";
// src/pages/api/products/index.ts
var products_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var jsonHeaders = {
	"Content-Type": "application/json",
	"Cache-Control": "no-store"
};
var GET = async () => {
	try {
		const products = await getAllProducts();
		return new Response(JSON.stringify({ products }), {
			status: 200,
			headers: jsonHeaders
		});
	} catch (error) {
		console.error("Product retrieval failed:", error);
		return new Response(JSON.stringify({ error: "Unable to load products." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
};
var POST = async ({ request }) => {
	if (!isRequestAuthenticated(request)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
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
		const created = await createProduct(validated.data);
		return new Response(JSON.stringify({ product: created }), {
			status: 201,
			headers: jsonHeaders
		});
	} catch (error) {
		console.error("Product creation failed:", error);
		return new Response(JSON.stringify({ error: "Unable to create product." }), {
			status: 500,
			headers: jsonHeaders
		});
	}
};
// \0virtual:astro:page:src/pages/api/products/index@_@ts
var page = () => products_exports;
export { page };
