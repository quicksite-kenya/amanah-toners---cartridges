import { h as addAttribute, l as renderTemplate, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import { a as createComponent } from "./Footer_CurHzRaG.mjs";
import { t as createAstro } from "./compiler_CDOLats0.mjs";
// src/components/Breadcrumb.astro
createAstro("https://astro.build");
var $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Breadcrumb;
	const { items } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 text-left"><nav aria-label="Breadcrumb" class="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500 overflow-x-auto whitespace-nowrap py-1"><a href="/" class="hover:text-[#0B2046] text-slate-500 transition-colors">Home</a>${items.map((item, index) => renderTemplate`<div class="flex items-center space-x-2"><span class="text-slate-400" aria-hidden="true">/</span>${item.href && index < items.length - 1 ? renderTemplate`<a${addAttribute(item.href, "href")} class="hover:text-[#0B2046] text-slate-500 transition-colors">${item.name}</a>` : renderTemplate`<span class="text-[#0B2046] font-black" aria-current="page">${item.name}</span>`}</div>`)}</nav><a href="/" class="inline-flex items-center space-x-2 bg-white hover:bg-[#0B2046] text-[#0B2046] hover:text-white border border-slate-200 hover:border-[#0B2046] px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-sm transition-all shrink-0 w-fit"><svg aria-hidden="true" class="w-3.5 h-3.5 text-[#E4A025]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg><span>Back to Home</span></a></div>`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/components/Breadcrumb.astro", void 0);
export { $$Breadcrumb as t };
