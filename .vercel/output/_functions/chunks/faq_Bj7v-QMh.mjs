import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import "./compiler_CDOLats0.mjs";
import { a as createComponent, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
// src/pages/faq.astro
var faq_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Faq,
	file: () => $$file,
	url: () => $$url
});
var $$Faq = createComponent(($$result, $$props, $$slots) => {
	const categories = [
		{
			title: "Product Authenticity & Verification",
			questions: [
				{
					q: "Are all your toner cartridges 100% original OEM products?",
					a: "Yes, absolutely. At Amanah Toners & Cartridges, our foundational promise is \"Trust Every Print\". We stock exclusively 100% genuine OEM toner cartridges, original ink refill bottles, and factory maintenance kits from HP, Canon, Kyocera, and Konica Minolta. Every product comes in its original sealed box with authentic manufacturer security holograms."
				},
				{
					q: "How can I verify the authenticity of an HP or Canon toner?",
					a: "All our HP products feature the official HP Security Hologram label with color-shifting technology and QR code verification via the HP SureSupply app. Canon and Kyocera cartridges include serialized anti-counterfeit security seals and tamper-evident pull tabs."
				},
				{
					q: "Do you sell compatible, generic, or refilled cartridges?",
					a: "No. We do not sell generic or third-party compatible refills. Experience has shown that generic powders cause background haze, inconsistent page yields, and premature fuser drum wear. We only supply genuine original consumables."
				}
			]
		},
		{
			title: "Ordering, Pricing & Quotations",
			questions: [
				{
					q: "Why are prices not listed on the website?",
					a: "We operate on an inquiry-only pricing model. Because printing consumable market prices fluctuate based on international exchange rates, shipment batches, and bulk volume discounts, inquiry pricing guarantees you always receive our sharpest, most competitive rate in real time."
				},
				{
					q: "How do I place an inquiry or request an official quote?",
					a: "You can add items to your Inquiry List right here on the website and submit the form, or click \"WhatsApp Order\" on any product page. You can also call us directly at 0185176133. Our sales desk typically replies within 5–15 minutes with complete pricing and delivery options."
				},
				{
					q: "Can you provide official Proforma Invoices and LPOs for corporate procurement?",
					a: "Yes. We routinely service government ministries, corporate headquarters, law firms, and schools with formal proforma invoices, ETR-compliant receipts, and delivery notes against Local Purchase Orders (LPOs)."
				}
			]
		},
		{
			title: "Delivery, Shipping & Counter Pickup",
			questions: [
				{
					q: "Can I pick up my toner in person in Nairobi?",
					a: "Yes! You are welcome to visit our physical office at KTDA Plaza in Nairobi CBD to collect your order in person, inspect the security holograms, and receive your receipt on the spot."
				},
				{
					q: "How fast is delivery within Nairobi?",
					a: "Within Nairobi CBD, delivery is usually completed in 1 to 2 hours. For Upper Hill, Westlands, Kilimani, and Industrial Area, same-day delivery via dedicated motorcycle rider takes 2 to 4 hours."
				},
				{
					q: "Do you ship to towns outside Nairobi?",
					a: "Yes. We provide next-day courier dispatch across all 47 counties in Kenya through verified logistics partners including G4S, Wells Fargo, Guardian, and EasyCoach. You will receive a waybill tracking code upon dispatch."
				}
			]
		},
		{
			title: "Printer Compatibility & Warranty",
			questions: [{
				q: "What if I am not sure which toner fits my printer model?",
				a: "Simply call or WhatsApp our technical desk at 0185176133 with your printer model name (e.g. \"HP LaserJet Pro 4001\" or \"Kyocera ECOSYS M2040dn\"). Our technicians will immediately confirm the exact part number and yield."
			}, {
				q: "What is your warranty and replacement policy?",
				a: "All genuine toner cartridges are backed by the respective manufacturer warranty against factory defects. In the unlikely event of an OEM fault, we replace the unit immediately upon inspection."
			}]
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Frequently Asked Questions — Amanah Toners Nairobi",
		"description": "Find answers to common questions about original toner cartridges, verification, inquiry pricing, and delivery across Kenya."
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-[#0B2046] py-16 text-white relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1.5 bg-[#E4A025]"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"><span class="text-[#E4A025] font-black text-xs tracking-[0.3em] uppercase mb-3 inline-block">Help & Product Knowledge</span><h1 class="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Frequently Asked Questions</h1><p class="text-slate-300 max-w-2xl mx-auto text-sm uppercase tracking-widest font-bold">Everything you need to know about genuine toner verification, ordering, and delivery.</p></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Frequently Asked Questions" }] })}<!-- FAQ Accordions by Category --><div class="space-y-12 mb-16">${categories.map((cat, catIdx) => renderTemplate`<div><div class="flex items-center space-x-3 mb-6"><span class="h-6 w-1 bg-[#E4A025] rounded-full"></span><h2 class="text-xl font-black text-[#0B2046] uppercase tracking-wide">${cat.title}</h2></div><div class="space-y-4">${cat.questions.map((item, qIdx) => renderTemplate`<details class="group bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all duration-200"><summary class="p-6 cursor-pointer flex items-center justify-between text-left font-black text-sm uppercase text-[#0B2046] group-hover:text-[#E4A025] select-none"><span class="pr-4">${item.q}</span><svg class="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></summary><div class="px-6 pb-6 pt-2 text-slate-600 text-sm font-medium leading-relaxed border-t border-slate-50"><p>${item.a}</p></div></details>`)}</div></div>`)}</div><!-- Need More Help Banner --><div class="bg-[#0B2046] text-white p-8 sm:p-10 rounded-3xl shadow-xl border-t-4 border-[#E4A025] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"><div><h3 class="text-xl font-black uppercase mb-1">Have a specific question not covered here?</h3><p class="text-xs text-slate-300 font-medium">Our sales and technical support teams at KTDA Plaza are standing by to help.</p></div><div class="flex flex-col sm:flex-row gap-3 shrink-0"><a href="https://wa.me/254185176133" target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span>Ask on WhatsApp</span></a><a href="tel:0185176133" class="bg-[#E4A025] hover:bg-yellow-500 text-[#0B2046] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center">Call 0185176133</a></div></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/faq.astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/faq.astro";
var $$url = "/faq";
// \0virtual:astro:page:src/pages/faq@_@astro
var page = () => faq_exports;
export { page };
