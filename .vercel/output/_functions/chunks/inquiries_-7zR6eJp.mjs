import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { l as recordInquiry } from "./db_8FjN3uWI.mjs";
// src/pages/api/inquiries.ts
var inquiries_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON request." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const type = body.type === "contact" ? "contact" : "quote";
	const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
	const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
	const organization = typeof body.organization === "string" ? body.organization.trim().slice(0, 160) : "";
	const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 160) : "";
	const message = typeof body.message === "string" ? body.message.trim().slice(0, 1500) : "";
	const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
	if (name.length < 2 || phone.length < 6) return new Response(JSON.stringify({ error: "Valid name and phone number are required." }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const id = await recordInquiry({
			type,
			name,
			phone,
			organization,
			subject,
			message,
			items
		});
		return new Response(JSON.stringify({
			ok: true,
			id
		}), {
			status: 201,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	} catch (error) {
		console.error("Failed to save inquiry:", error);
		return new Response(JSON.stringify({ error: "Unable to submit your inquiry right now. Please try again." }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
};
// \0virtual:astro:page:src/pages/api/inquiries@_@ts
var page = () => inquiries_exports;
export { page };
