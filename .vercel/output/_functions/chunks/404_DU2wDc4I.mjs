import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import "./compiler_CDOLats0.mjs";
import { a as createComponent, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
// src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "404 — Page Not Found | Amanah Toners",
		"noindex": true
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-4xl mx-auto px-4 py-16 text-center"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "404 Page Not Found" }] })}<div class="bg-white p-10 sm:p-16 rounded-3xl shadow-2xl border border-slate-200 mt-4"><span class="text-[#E4A025] font-black text-6xl sm:text-7xl tracking-widest block mb-4">404</span><h1 class="text-3xl font-black text-[#0B2046] uppercase mb-4">Page Not Found</h1><p class="text-slate-600 mb-8 text-sm font-medium leading-relaxed max-w-md mx-auto">The page you requested may have been moved, renamed, or is temporarily unavailable. Explore our verified shop catalog or contact our sales team at KTDA Plaza.</p><h2 class="sr-only">Helpful Links</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left"><a href="/shop/" class="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all"><p class="font-black text-[#0B2046] text-xs uppercase mb-1">Shop Catalog</p><p class="text-[11px] text-slate-500 font-medium">Browse genuine HP, Canon, Kyocera toners & ink.</p></a><a href="/brands/hp/" class="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all"><p class="font-black text-[#0B2046] text-xs uppercase mb-1">HP Consumables</p><p class="text-[11px] text-slate-500 font-medium">Original LaserJet & JetIntelligence cartridges.</p></a><a href="/contact/" class="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all"><p class="font-black text-[#0B2046] text-xs uppercase mb-1">Contact Office</p><p class="text-[11px] text-slate-500 font-medium">Nairobi KTDA Plaza • Call 0185176133.</p></a></div><a href="/" class="inline-flex items-center bg-[#0B2046] hover:bg-[#15346B] text-white font-black py-4 px-8 rounded-xl transition-all uppercase tracking-widest text-xs shadow-xl"><svg aria-hidden="true" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>Return to Homepage</a></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/404.astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/404.astro";
var $$url = "/404";
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };
