import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { h as addAttribute, l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import "./compiler_CDOLats0.mjs";
import { a as createComponent, i as renderScript, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
import { t as IMAGE_DIMENSIONS } from "./products_CnEknUrj.mjs";
// src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const assetPaths = Object.keys(IMAGE_DIMENSIONS);
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Admin Portal — Amanah Toners & Cartridges",
		"noindex": true
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Admin Portal" }] })}<h1 class="sr-only">Amanah Admin Portal</h1></div><div id="admin-root"${addAttribute(JSON.stringify(assetPaths), "data-assets")}><div class="max-w-md mx-auto px-4 py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Verifying admin session...</div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}${renderScript($$result, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/admin/index.astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/admin/index.astro";
var $$url = "/admin";
// \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
export { page };
