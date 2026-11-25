import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { c as recordFailedLoginAttempt, i as getClientKey, n as claimInitialAdminPassword, r as clearFailedLoginAttempts, s as issueAdminToken, t as checkLoginRateLimit } from "./auth_CDK90z6D.mjs";
// src/pages/api/admin/setup.ts
var setup_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	const clientKey = getClientKey(request);
	const rate = checkLoginRateLimit(clientKey);
	if (!rate.allowed) return new Response(JSON.stringify({ error: `Too many attempts. Try again in ${rate.retryAfterSec}s.` }), {
		status: 429,
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
	const result = await claimInitialAdminPassword(password);
	if (!result.ok) {
		recordFailedLoginAttempt(clientKey);
		const status = result.error?.includes("already") ? 403 : 400;
		return new Response(JSON.stringify({ error: result.error }), {
			status,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
	clearFailedLoginAttempts(clientKey);
	const token = issueAdminToken();
	return new Response(JSON.stringify({ token }), {
		status: 201,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store"
		}
	});
};
// \0virtual:astro:page:src/pages/api/admin/setup@_@ts
var page = () => setup_exports;
export { page };
