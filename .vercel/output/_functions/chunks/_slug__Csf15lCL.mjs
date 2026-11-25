import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { h as addAttribute, l as renderTemplate, r as renderComponent, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import { t as createAstro } from "./compiler_CDOLats0.mjs";
import { a as createComponent, i as renderScript, n as $$Header, r as $$Layout, t as $$Footer } from "./Footer_CurHzRaG.mjs";
import { t as $$Breadcrumb } from "./Breadcrumb_yeEa36kJ.mjs";
import { c as getProductsByCategorySlug } from "./db_8FjN3uWI.mjs";
import { n as getImageDimensions } from "./products_CnEknUrj.mjs";
// src/pages/categories/[slug].astro
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
	const categoryDetails = {
		"toner-cartridges": {
			category: "Toner Cartridges",
			title: "Laser Toner Cartridges",
			subtitle: "Original OEM Toner Cartridges for Enterprise & Office Printers",
			narrative: "Genuine laser toner cartridges engineered for crisp black text, sharp vector lines, and consistent page yields. Sourced directly from HP, Canon, Kyocera, and Konica Minolta to guarantee optimum printer life and zero smudging."
		},
		"ink-cartridges": {
			category: "Ink Cartridges",
			title: "Original Ink Cartridges & Bottles",
			subtitle: "Genuine High-Yield Pigment & Dye Inks",
			narrative: "Authentic high-capacity ink bottles and cartridges delivering rich color saturation, fade resistance, and precision droplet accuracy for Canon PIXMA, HP Smart Tank, and enterprise inkjet printers."
		},
		"printers": {
			category: "Printers",
			title: "Heavy-Duty Office Printers & Copiers",
			subtitle: "Commercial Workgroup Printers & Multifunction Machines",
			narrative: "Robust office printing solutions, network laser copiers, and heavy-duty multifunction printers engineered for dependable high-volume document workflows with low per-page operating costs."
		},
		"printer-accessories": {
			category: "Printer Accessories",
			title: "Printer Accessories & Maintenance Kits",
			subtitle: "Original Manufacturer Maintenance & Imaging Kits",
			narrative: "Keep your laser printers in peak operating condition with authentic maintenance kits, replacement drums, feed rollers, and fuser components. Reduces downtime and prevents paper misfeeds."
		}
	};
	const { category: dbCategory, products } = await getProductsByCategorySlug(slug);
	const knownDetails = categoryDetails[slug];
	const category = dbCategory || knownDetails?.category || "";
	if (!category) return new Response("Category not found", { status: 404 });
	const title = knownDetails?.title || category;
	const subtitle = knownDetails?.subtitle || `Genuine ${category} Supplies`;
	const narrative = knownDetails?.narrative || `Original certified ${category} for businesses and corporate offices across Kenya.`;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `${title} â€” Amanah Toners & Cartridges`,
		"description": `Shop genuine ${title} at Amanah in Nairobi, Kenya. Original manufacturer quality with fast same-day dispatch.`
	}, {
		"default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-[#0B2046] py-16 text-white relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1.5 bg-[#E4A025]"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="max-w-3xl"><span class="text-[#E4A025] font-black text-xs tracking-[0.3em] uppercase mb-3 inline-block">Category Catalog</span><h1 class="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">${title}</h1><p class="text-slate-200 text-base font-medium leading-relaxed mb-4">${subtitle}</p><p class="text-slate-300 text-sm leading-relaxed max-w-2xl">${narrative}</p></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><!-- Breadcrumbs -->${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": [{ name: "Categories" }, { name: category }] })}<!-- Action Bar --><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200"><div><h2 class="text-xl font-black text-[#0B2046] uppercase">In-Stock ${category}</h2><p class="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Showing ${products.length} verified products</p></div><div><a href="/shop/" class="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#0B2046] hover:text-[#E4A025] transition-colors"><span>View All Categories</span><svg aria-hidden="true" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div></div><!-- Products Grid --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">${products.map((product, idx) => {
			const dims = getImageDimensions(product.imageUrl);
			return renderTemplate`<div class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-100 group transition-all hover:-translate-y-2 duration-300"><div class="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-6"><img${addAttribute(product.imageUrl, "src")}${addAttribute(product.model, "alt")}${addAttribute(dims.width, "width")}${addAttribute(dims.height, "height")}${addAttribute(idx >= 4 ? "lazy" : "eager", "loading")} decoding="async" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"><div class="absolute top-4 left-4"><span class="bg-[#0B2046] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">${product.brand}</span></div></div><div class="p-6 flex flex-col flex-1"><div class="flex items-center space-x-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2"><span>${product.brand}</span><span aria-hidden="true">Â·</span><span class="text-emerald-600 font-black">In Stock</span></div><a${addAttribute(`/products/${product.slug}/`, "href")}><h3 class="text-base font-black text-[#0B2046] mb-1 uppercase hover:text-[#E4A025] transition-colors leading-snug">${product.model}</h3></a>${product.partNumber && renderTemplate`<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Part: ${product.partNumber}</p>`}<p class="text-xs text-slate-500 mb-6 flex-1 line-clamp-2 font-medium leading-relaxed">${product.description}</p><div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2"><a${addAttribute(`/products/${product.slug}/`, "href")} class="bg-slate-100 hover:bg-slate-200 text-[#0B2046] text-xs font-black px-3 py-2.5 rounded-xl transition-all text-center uppercase tracking-wider flex-1">Details</a><button type="button"${addAttribute(`Add ${product.model} to inquiry list`, "aria-label")} class="category-add-btn bg-[#0B2046] hover:bg-[#15346B] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider flex items-center justify-center space-x-1 flex-1 cursor-pointer"${addAttribute(JSON.stringify(product), "data-product")}><span class="btn-label">Inquire</span></button></div></div></div>`;
		})}</div><!-- Category Advice Card --><div class="mt-16 bg-[#0B2046] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"><div class="relative z-10"><span class="text-[#E4A025] font-black text-xs uppercase tracking-widest block mb-1">Corporate Inquiries & Bulk Supply</span><h3 class="text-2xl font-black uppercase mb-2">Need a custom quote for ${title}?</h3><p class="text-slate-300 text-xs font-medium max-w-xl">We provide formal proforma invoices, scheduled monthly refills, and direct office delivery across Nairobi and upcountry.</p></div><div class="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0"><a${addAttribute(`https://wa.me/254185176133?text=${encodeURIComponent(`Hello Amanah Toners, I need a quotation for ${title}.`)}`, "href")} target="_blank" rel="noopener noreferrer" class="bg-[#E4A025] hover:bg-yellow-500 text-[#0B2046] font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center space-x-2"><span>Chat on WhatsApp</span></a></div></div></div>`,
		"header": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, { "slot": "header" })}`,
		"footer": ($$result) => renderTemplate`${renderComponent($$result, "Footer", $$Footer, { "slot": "footer" })}`
	})}${renderScript($$result, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/categories/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/categories/[slug].astro", void 0);
var $$file = "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/pages/categories/[slug].astro";
var $$url = "/categories/[slug]";
// \0virtual:astro:page:src/pages/categories/[slug]@_@astro
var page = () => _slug__exports;
export { page };
