import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import "./compiler_CDOLats0.mjs";
import { a as createComponent, i as renderScript, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
// src/pages/inquiry.astro
var inquiry_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Inquiry,
	file: () => $$file,
	url: () => $$url
});
var $$Inquiry = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Inquiry Cart & Quotation Request — Amanah Toners",
		"description": "Review your selected toner cartridges, adjust quantities, and request an instant quotation via form or WhatsApp."
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-[#0B2046] py-14 text-white relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1.5 bg-[#E4A025]"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"><span class="text-[#E4A025] font-black text-xs tracking-[0.3em] uppercase mb-2 inline-block">Official Quotations</span><h1 class="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">Inquiry Cart Desk</h1><p class="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm uppercase tracking-widest font-bold">Manage your items and request immediate competitive pricing from our KTDA Plaza sales team.</p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Inquiry Cart" }] })}<div id="inquiry-app"><!-- Populated safely via client script --></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}${renderScript($$result, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/inquiry.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/inquiry.astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/inquiry.astro";
var $$url = "/inquiry";
// \0virtual:astro:page:src/pages/inquiry@_@astro
var page = () => inquiry_exports;
export { page };
