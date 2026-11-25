import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import "./compiler_CDOLats0.mjs";
import { a as createComponent, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
// src/pages/privacy.astro
var privacy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Privacy,
	file: () => $$file,
	url: () => $$url
});
var $$Privacy = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Privacy Policy — Amanah Toners & Cartridges",
		"description": "Privacy policy and data protection policies for Amanah Toners & Cartridges, Nairobi KTDA Plaza."
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-[#0B2046] py-16 text-white relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1.5 bg-[#E4A025]"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"><span class="text-[#E4A025] font-black text-xs tracking-[0.3em] uppercase mb-3 inline-block">Data Protection</span><h1 class="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Privacy Policy</h1><p class="text-slate-300 text-xs sm:text-sm uppercase tracking-widest font-bold">Amanah Toners & Cartridges • Nairobi, KTDA PLAZA</p></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Privacy Policy" }] })}<div class="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-100 space-y-8 text-slate-700 font-medium text-sm leading-relaxed"><section><h2 class="text-xl font-black text-[#0B2046] uppercase mb-3">1. Information We Collect</h2><p class="mb-3">When you use our website, place a product inquiry, or communicate with us through WhatsApp or telephone, Amanah Toners & Cartridges may collect the following information:</p><ul class="list-disc pl-5 space-y-1 text-slate-600"><li>Your contact name and job title or organization name.</li><li>Your telephone and WhatsApp contact number.</li><li>Physical delivery addresses and office locations within Nairobi or upcountry.</li><li>Printer brand preferences and consumable part code requirements.</li></ul></section><section><h2 class="text-xl font-black text-[#0B2046] uppercase mb-3">2. How We Use Your Information</h2><p class="mb-3">The information collected is used exclusively for legitimate business purposes:</p><ul class="list-disc pl-5 space-y-1 text-slate-600"><li>Preparing and transmitting price quotations and formal proforma invoices.</li><li>Fulfilling customer orders and coordinating courier dispatch from KTDA Plaza, Nairobi.</li><li>Confirming product compatibility with your specific office printer hardware.</li><li>Providing post-delivery customer care and technical support.</li></ul></section><section><h2 class="text-xl font-black text-[#0B2046] uppercase mb-3">3. Data Security & Confidentiality</h2><p>We employ robust administrative and operational safeguards to secure all customer information against unauthorized access, loss, or disclosure. We do not sell, rent, or lease client details to any third-party advertisers or marketing agencies.</p></section><section><h2 class="text-xl font-black text-[#0B2046] uppercase mb-3">4. Communication Channels</h2><p>By submitting an inquiry form or contacting our sales team via WhatsApp, you consent to receive direct communications regarding your quotation and order fulfillment. You may opt out of future updates at any time by notifying our desk.</p></section><section><h2 class="text-xl font-black text-[#0B2046] uppercase mb-3">5. Contact Information</h2><p>For any questions regarding our privacy practices or data handling, please contact:</p><div class="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs"><p class="font-black text-[#0B2046] uppercase">Amanah Toners & Cartridges</p><p class="text-slate-600">Headquarters: Nairobi, KTDA PLAZA, Kenya</p><p class="text-slate-600">Telephone / WhatsApp: 0185176133</p><p class="text-slate-600">Website: https://amanah.or.ke</p></div></section></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/privacy.astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/privacy.astro";
var $$url = "/privacy";
// \0virtual:astro:page:src/pages/privacy@_@astro
var page = () => privacy_exports;
export { page };
