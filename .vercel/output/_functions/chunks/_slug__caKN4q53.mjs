import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { h as addAttribute, l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import { t as createAstro } from "./compiler_CDOLats0.mjs";
import { a as createComponent, i as renderScript, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
import { s as getProductsByBrandSlug } from "./db_8FjN3uWI.mjs";
import { n as getImageDimensions } from "./products_CnEknUrj.mjs";
// src/pages/brands/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = (Astro.params.slug || "").toLowerCase();
	const brandDescriptions = {
		"hp": {
			name: "HP",
			subtitle: "Original HP LaserJet & Smart Tank Consumables",
			narrative: "Amanah Toners supplies 100% genuine HP toner cartridges with JetIntelligence technology, precision ink bottles, and original enterprise maintenance units. Designed to prevent paper jams, optimize page yields, and protect your office printers."
		},
		"canon": {
			name: "Canon",
			subtitle: "Genuine Canon i-SENSYS & imageRUNNER Supplies",
			narrative: "Explore our complete range of certified Canon toner cartridges, high-yield GI ink refill bottles, and imageRUNNER commercial copiers. Engineered for vibrant color accuracy, streak-free monochrome clarity, and seamless operation."
		},
		"kyocera": {
			name: "Kyocera",
			subtitle: "Original Kyocera ECOSYS Long-Life Toner Kits",
			narrative: "Kyocera ECOSYS office printers and multifunction copiers demand genuine ceramic-drum compatible toner kits. We stock authentic TK-1170, TK-3160, and OEM MK maintenance kits for high-volume enterprise printing with lowest total cost of ownership."
		},
		"konica-minolta": {
			name: "Konica Minolta",
			subtitle: "Authentic Konica Minolta bizhub Production Toners",
			narrative: "Precision Simitri HD polymerized toners for Konica Minolta bizhub and bizhub PRESS series. Delivers razor-sharp text, consistent micro-dot imaging, and industrial durability for publishing and high-speed commercial printing."
		}
	};
	const { brand: dbBrand, products } = await getProductsByBrandSlug(slug);
	const knownInfo = brandDescriptions[slug];
	const brand = dbBrand || knownInfo?.name || "";
	if (!brand) return new Response("Brand not found", { status: 404 });
	const subtitle = knownInfo?.subtitle || `Certified ${brand} Printing Consumables`;
	const narrative = knownInfo?.narrative || `Genuine ${brand} toner cartridges and consumables sourced for enterprise and office printing excellence.`;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${brand} Original Toners & Supplies â€” Amanah Kenya`,
		"description": `Official supplier of 100% genuine ${brand} toner cartridges and consumables in Nairobi, Kenya. Order with same-day dispatch.`
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-[#0B2046] py-16 text-white relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1.5 bg-[#E4A025]"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="max-w-3xl"><span class="text-[#E4A025] font-black text-xs tracking-[0.3em] uppercase mb-3 inline-block">100% Genuine Certified</span><h1 class="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">${brand} Printing Supplies</h1><p class="text-slate-200 text-base font-medium leading-relaxed mb-4">${subtitle}</p><p class="text-slate-300 text-sm leading-relaxed max-w-2xl">${narrative}</p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Brands" }, { name: brand }] })}<!-- Action Bar --><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200"><div><h2 class="text-xl font-black text-[#0B2046] uppercase">Available ${brand} Inventory</h2><p class="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Showing ${products.length} certified original items</p></div><div class="flex items-center space-x-4"><a href="/shop/" class="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#0B2046] hover:text-[#E4A025] transition-colors"><span>View All Brands in Shop</span><svg aria-hidden="true" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div></div><!-- Products Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">${products.map((product, idx) => {
			const dims = getImageDimensions(product.imageUrl);
			return renderTemplate`<div class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-100 group transition-all hover:-translate-y-2 duration-300"><div class="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-6"><img${addAttribute(product.imageUrl, "src")}${addAttribute(product.model, "alt")}${addAttribute(dims.width, "width")}${addAttribute(dims.height, "height")}${addAttribute(idx >= 4 ? "lazy" : "eager", "loading")} decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"><div class="absolute top-4 left-4"><span class="bg-[#0B2046] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">${product.brand}</span></div></div><div class="p-6 flex flex-col flex-1"><div class="flex items-center space-x-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2"><span>${product.category}</span><span aria-hidden="true">Â·</span><span class="text-emerald-600 font-black">In Stock</span></div><a${addAttribute(`/products/${product.slug}/`, "href")}><h3 class="text-base font-black text-[#0B2046] mb-1 uppercase hover:text-[#E4A025] transition-colors leading-snug">${product.model}</h3></a>${product.partNumber && renderTemplate`<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Part: ${product.partNumber}</p>`}<p class="text-xs text-slate-500 mb-6 flex-1 line-clamp-2 font-medium leading-relaxed">${product.description}</p><div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2"><a${addAttribute(`/products/${product.slug}/`, "href")} class="bg-slate-100 hover:bg-slate-200 text-[#0B2046] text-xs font-black px-3 py-2.5 rounded-xl transition-all text-center uppercase tracking-wider flex-1">Details</a><button type="button"${addAttribute(`Add ${product.model} to inquiry list`, "aria-label")} class="brand-add-btn bg-[#0B2046] hover:bg-[#15346B] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider flex items-center justify-center space-x-1 flex-1 cursor-pointer"${addAttribute(JSON.stringify(product), "data-product")}><span class="btn-label">Inquire</span></button></div></div></div>`;
		})}</div><!-- Brand Supply Assistance Banner --><div class="mt-16 bg-slate-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200"><div><h3 class="text-xl font-black text-[#0B2046] uppercase mb-1">Looking for a specific ${brand} model?</h3><p class="text-slate-600 text-xs font-medium">We stock both standard and rare ${brand} part numbers at our KTDA Plaza warehouse. Contact us directly for immediate verification.</p></div><div class="flex flex-col sm:flex-row gap-3 shrink-0"><a${addAttribute(`https://wa.me/254185176133?text=${encodeURIComponent(`Hello Amanah, I need assistance finding a specific ${brand} toner / cartridge model.`)}`, "href")} target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center space-x-2"><svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span>Ask on WhatsApp</span></a><a href="tel:0185176133" class="bg-[#0B2046] hover:bg-[#15346B] text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center">Call 0185176133</a></div></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}${renderScript($$result, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/brands/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/brands/[slug].astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/brands/[slug].astro";
var $$url = "/brands/[slug]";
// \0virtual:astro:page:src/pages/brands/[slug]@_@astro
var page = () => _slug__exports;
export { page };
