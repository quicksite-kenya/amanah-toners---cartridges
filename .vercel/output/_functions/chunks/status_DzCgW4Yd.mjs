import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { a as isAdminConfigured, o as isRequestAuthenticated } from "./auth_CDK90z6D.mjs";
// src/pages/api/admin/status.ts
var status_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request }) => {
	try {
		const envConfigured = Boolean(process.env.ADMIN_PASSCODE?.trim());
		const needsSetup = !await isAdminConfigured();
		const authenticated = isRequestAuthenticated(request);
		return new Response(JSON.stringify({
			envConfigured,
			needsSetup,
			authenticated
		}), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	} catch (error) {
		console.error("Admin status check failed:", error);
		return new Response(JSON.stringify({ error: "Unable to check admin status." }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
			}
		});
	}
};
// \0virtual:astro:page:src/pages/api/admin/status@_@ts
var page = () => status_exports;
export { page };
