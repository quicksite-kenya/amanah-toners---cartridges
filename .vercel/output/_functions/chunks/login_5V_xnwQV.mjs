import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as isAdminConfigured, c as recordFailedLoginAttempt, i as getClientKey, r as clearFailedLoginAttempts, s as issueAdminToken, t as checkLoginRateLimit, u as verifyAdminCredentials } from "./auth_CDK90z6D.mjs";
// src/pages/api/admin/login.ts
var login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	const clientKey = getClientKey(request);
	const rate = checkLoginRateLimit(clientKey);
	if (!rate.allowed) return new Response(JSON.stringify({ error: `Too many failed attempts. Please wait ${rate.retryAfterSec}s.` }), {
		status: 429,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store"
		}
	});
	try {
		if (!await isAdminConfigured()) return new Response(JSON.stringify({
			error: "Admin access has not been initialized yet.",
			needsSetup: true
		}), {
			status: 409,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
		let body = {};
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON request." }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const password = typeof body.password === "string" ? body.password : "";
		if (!await verifyAdminCredentials(password)) {
			recordFailedLoginAttempt(clientKey);
			return new Response(JSON.stringify({ error: "Incorrect admin password." }), {
				status: 401,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store"
				}
			});
		}
		clearFailedLoginAttempts(clientKey);
		const token = issueAdminToken();
		return new Response(JSON.stringify({ token }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	} catch (error) {
		console.error("Admin login failed:", error);
		return new Response(JSON.stringify({ error: "Unable to process admin login right now." }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
};
// \0virtual:astro:page:src/pages/api/admin/login@_@ts
var page = () => login_exports;
export { page };
