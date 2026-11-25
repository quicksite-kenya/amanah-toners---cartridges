import { K as AstroError, h as InvalidComponentArgs } from "./errors-data_Bu7LYtXB.mjs";
import { d as renderHead, f as createRenderInstruction, h as addAttribute, l as renderTemplate, o as renderSlot, u as maybeRenderHead } from "./server_Dsj3-JKx.mjs";
import { t as createAstro } from "./compiler_CDOLats0.mjs";
// node_modules/@astrojs/runtime/dist/internal/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
// node_modules/@astrojs/runtime/dist/internal/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description = "Amanah Toners & Cartridges — Trust Every Print. Kenya's premier supplier of original HP, Canon, Kyocera, Konica Minolta, Epson, and Brother toner cartridges and consumables.", noindex = false } = Astro.props;
	return renderTemplate`<html lang="en" class="scroll-smooth"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/logo.png"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<!-- Open Graph / Social --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image" content="/logo.png"><!-- Tailwind CSS / Global Styles -->${renderHead($$result)}</head><body class="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-[#E4A025] selection:text-[#0B2046]"><!-- Top Gold Brand Accent Bar --><div class="h-1.5 w-full bg-[#E4A025] sticky top-0 z-[60]"></div><!-- Header Component -->${renderSlot($$result, $$slots["header"])}<!-- Main Content --><main class="flex-1 w-full relative">${renderSlot($$result, $$slots["default"])}</main><!-- Footer Component -->${renderSlot($$result, $$slots["footer"])}</body></html>`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/layouts/Layout.astro", void 0);
// src/components/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const navLinks = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Shop",
			href: "/shop/"
		},
		{
			name: "About",
			href: "/about/"
		},
		{
			name: "Delivery",
			href: "/delivery/"
		},
		{
			name: "FAQ",
			href: "/faq/"
		},
		{
			name: "Contact",
			href: "/contact/"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<header class="bg-[#0B2046] shadow-2xl sticky top-1.5 z-50 border-b border-white/5"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-24"><a href="/" class="flex items-center cursor-pointer group shrink-0"><div class="bg-white p-2 rounded-2xl shadow-xl group-hover:scale-105 transition-all duration-300 border border-white/15"><img src="/logo.png" alt="Amanah Toners &amp; Cartridges" width="512" height="512" decoding="async" class="h-11 w-11 object-contain"></div><div class="ml-4 hidden sm:block"><p class="text-white font-black text-sm tracking-[0.3em] uppercase leading-none mb-1">Amanah</p><p class="text-[#E4A025] font-black text-[9px] uppercase tracking-[0.2em] leading-none opacity-90 italic">Trust Every Print</p></div></a><nav aria-label="Main Navigation" class="hidden lg:flex items-center space-x-8">${navLinks.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-[#E4A025] transition-all relative group py-2">${item.name}<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E4A025] transition-all group-hover:w-full"></span></a>`)}</nav><div class="flex items-center space-x-4"><a href="tel:0185176133" class="hidden md:flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-white transition-all"><svg aria-hidden="true" class="w-4 h-4 text-[#E4A025]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span class="text-xs font-black tracking-wider">0185176133</span></a><a href="/inquiry/" aria-label="Inquiry Cart" class="relative flex items-center p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all group border border-white/5"><svg aria-hidden="true" class="w-5 h-5 group-hover:text-[#E4A025] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg><span id="cart-badge" class="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#E4A025] text-[11px] font-black text-[#0B2046] shadow-xl leading-none">0</span></a><button id="mobile-menu-toggle" type="button" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mobile-menu-drawer" class="lg:hidden p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/5 focus:outline-none cursor-pointer"><svg id="menu-icon-open" aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg><svg id="menu-icon-close" aria-hidden="true" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div id="mobile-menu-drawer" class="lg:hidden hidden bg-[#0B2046] border-t border-white/10 px-4 pt-4 pb-8 shadow-2xl"><div class="flex flex-col space-y-4">${navLinks.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="text-xs font-black uppercase tracking-[0.25em] text-white/90 hover:text-[#E4A025] py-2 border-b border-white/5">${item.name}</a>`)}<div class="pt-2"><p class="text-[10px] font-black uppercase tracking-widest text-[#E4A025] mb-2">Shop by Brand</p><div class="grid grid-cols-2 gap-2">${[
		{
			name: "HP",
			href: "/brands/hp/"
		},
		{
			name: "Canon",
			href: "/brands/canon/"
		},
		{
			name: "Kyocera",
			href: "/brands/kyocera/"
		},
		{
			name: "Konica Minolta",
			href: "/brands/konica-minolta/"
		}
	].map((brand) => renderTemplate`<a${addAttribute(brand.href, "href")} class="text-xs font-bold text-slate-300 hover:text-white py-1">${brand.name}</a>`)}</div></div><div class="pt-2"><p class="text-[10px] font-black uppercase tracking-widest text-[#E4A025] mb-2">Shop by Category</p><div class="grid grid-cols-2 gap-2">${[
		{
			name: "Toner Cartridges",
			href: "/categories/toner-cartridges/"
		},
		{
			name: "Ink Cartridges",
			href: "/categories/ink-cartridges/"
		},
		{
			name: "Printers",
			href: "/categories/printers/"
		},
		{
			name: "Accessories",
			href: "/categories/printer-accessories/"
		}
	].map((cat) => renderTemplate`<a${addAttribute(cat.href, "href")} class="text-xs font-bold text-slate-300 hover:text-white py-1">${cat.name}</a>`)}</div></div><div class="pt-4 border-t border-white/10 flex flex-col space-y-3"><a href="tel:0185176133" class="text-xs font-black text-[#E4A025] flex items-center space-x-2"><svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span>Call: 0185176133</span></a><p class="text-[11px] font-bold text-slate-400">Location: Nairobi, KTDA PLAZA</p></div></div></div></header>${renderScript($$result, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/components/Header.astro", void 0);
// src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-[#0B2046] text-white pt-20 pb-12 border-t-4 border-[#E4A025] relative overflow-hidden"><h2 class="sr-only">Footer Navigation and Office Contact</h2><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16"><div class="lg:col-span-2"><a href="/" class="inline-block bg-white rounded-2xl p-3 mb-6 shadow-xl border border-white/10"><img src="/logo.png" alt="Amanah Toners &amp; Cartridges" width="512" height="512" loading="lazy" decoding="async" class="h-14 w-14 object-contain"></a><p class="text-xs text-slate-300 leading-relaxed uppercase tracking-wider font-bold mb-6 max-w-sm">Amanah Toners & Cartridges — Trust Every Print. Kenya's premier supplier of original HP, Canon, Kyocera, and Konica Minolta printing supplies.</p><div class="flex items-center space-x-2 text-[#E4A025] text-xs font-black uppercase tracking-widest"><svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg><span>100% Genuine OEM Certified</span></div></div><div><h3 class="font-black text-xs uppercase tracking-[0.25em] mb-6 text-[#E4A025]">Quick Links</h3><ul class="space-y-3 text-xs font-bold uppercase text-slate-300"><li><a href="/" class="hover:text-[#E4A025] transition-colors">Home</a></li><li><a href="/shop/" class="hover:text-[#E4A025] transition-colors">Shop Catalog</a></li><li><a href="/about/" class="hover:text-[#E4A025] transition-colors">About Us</a></li><li><a href="/delivery/" class="hover:text-[#E4A025] transition-colors">Delivery Information</a></li><li><a href="/faq/" class="hover:text-[#E4A025] transition-colors">FAQ</a></li><li><a href="/inquiry/" class="hover:text-[#E4A025] transition-colors">Inquiry Cart</a></li><li><a href="/contact/" class="hover:text-[#E4A025] transition-colors">Contact Us</a></li></ul></div><div><h3 class="font-black text-xs uppercase tracking-[0.25em] mb-6 text-[#E4A025]">Brands & Catalog</h3><ul class="space-y-3 text-xs font-bold uppercase text-slate-300">${[
		{
			name: "HP Toners & Ink",
			href: "/brands/hp/"
		},
		{
			name: "Canon Cartridges",
			href: "/brands/canon/"
		},
		{
			name: "Kyocera ECOSYS",
			href: "/brands/kyocera/"
		},
		{
			name: "Konica Minolta bizhub",
			href: "/brands/konica-minolta/"
		}
	].map((b) => renderTemplate`<li><a${addAttribute(b.href, "href")} class="hover:text-[#E4A025] transition-colors">${b.name}</a></li>`)}${[
		{
			name: "Toner Cartridges",
			href: "/categories/toner-cartridges/"
		},
		{
			name: "Ink Cartridges",
			href: "/categories/ink-cartridges/"
		},
		{
			name: "Office Printers",
			href: "/categories/printers/"
		},
		{
			name: "Printer Accessories",
			href: "/categories/printer-accessories/"
		}
	].map((c) => renderTemplate`<li><a${addAttribute(c.href, "href")} class="hover:text-[#E4A025] transition-colors">${c.name}</a></li>`)}</ul></div><div><h3 class="font-black text-xs uppercase tracking-[0.25em] mb-6 text-[#E4A025]">Contact Office</h3><div class="space-y-4"><div><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CALL / WHATSAPP</p><a href="tel:0185176133" class="text-base font-black text-white hover:text-[#E4A025] transition-colors block">0185176133</a></div><div><p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PHYSICAL HEADQUARTERS</p><p class="text-xs font-bold text-slate-300">Nairobi, KTDA PLAZA</p></div><div class="pt-2"><a href="/admin/" class="text-[10px] font-bold text-slate-400 hover:text-[#E4A025] uppercase tracking-widest block">Admin Portal &rarr;</a></div></div></div></div><div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-bold uppercase tracking-widest text-slate-400"><p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Amanah Toners & Cartridges. All rights reserved.</p><div class="flex space-x-6"><a href="/privacy/" class="hover:text-[#E4A025] transition-colors">Privacy Policy</a><a href="/terms/" class="hover:text-[#E4A025] transition-colors">Terms of Service</a></div></div></div></footer>`;
}, "C:/Users/TOWN ICT/Downloads/amanah-toners-&-cartridges/src/components/Footer.astro", void 0);
export { createComponent as a, renderScript as i, $$Header as n, $$Layout as r, $$Footer as t };
