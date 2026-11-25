import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
// src/lib/supabase.ts
var supabaseClient = null;
function getSupabase() {
	if (supabaseClient) return supabaseClient;
	const url = process.env.SUPABASE_URL;
	const secretKey = process.env.SUPABASE_SECRET_KEY;
	if (!url || !secretKey) throw new Error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY environment variables.");
	supabaseClient = createClient(url, secretKey, { auth: {
		persistSession: false,
		autoRefreshToken: false,
		detectSessionInUrl: false
	} });
	return supabaseClient;
}
// src/lib/db.ts
function mapRow(row) {
	return {
		id: row.id,
		slug: row.slug,
		brand: row.brand,
		model: row.model,
		category: row.category,
		partNumber: row.part_number || void 0,
		compatiblePrinters: row.compatible_printers || void 0,
		imageUrl: row.image_url,
		description: row.description,
		stock: row.stock,
		inquiryOnly: Boolean(row.inquiry_only)
	};
}
function slugify(text) {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
async function getAllProducts() {
	const { data, error } = await getSupabase().from("products").select("*").order("created_at", { ascending: true });
	if (error) throw new Error(`Failed to fetch products: ${error.message}`);
	return (data || []).map((row) => mapRow(row));
}
async function getProductBySlug(slug) {
	const { data, error } = await getSupabase().from("products").select("*").eq("slug", slug).maybeSingle();
	if (error) throw new Error(`Failed to fetch product: ${error.message}`);
	return data ? mapRow(data) : null;
}
async function getProductById(id) {
	const { data, error } = await getSupabase().from("products").select("*").eq("id", id).maybeSingle();
	if (error) throw new Error(`Failed to fetch product: ${error.message}`);
	return data ? mapRow(data) : null;
}
async function getProductsByBrandSlug(brandSlug) {
	const matched = (await getAllProducts()).filter((product) => slugify(product.brand) === brandSlug.toLowerCase());
	return {
		brand: matched.length > 0 ? matched[0].brand : null,
		products: matched
	};
}
async function getProductsByCategorySlug(categorySlug) {
	const matched = (await getAllProducts()).filter((product) => slugify(product.category) === categorySlug.toLowerCase());
	return {
		category: matched.length > 0 ? matched[0].category : null,
		products: matched
	};
}
async function ensureUniqueSlug(baseSlug, excludeId) {
	const supabase = getSupabase();
	const cleanBase = baseSlug || "product";
	let candidate = cleanBase;
	let counter = 2;
	while (true) {
		let query = supabase.from("products").select("id").eq("slug", candidate);
		if (excludeId) query = query.neq("id", excludeId);
		const { data, error } = await query.maybeSingle();
		if (error) throw new Error(`Failed to check product slug: ${error.message}`);
		if (!data) return candidate;
		candidate = `${cleanBase}-${counter}`;
		counter++;
	}
}
async function createProduct(input) {
	const supabase = getSupabase();
	const id = `p_${randomUUID()}`;
	const slug = await ensureUniqueSlug(slugify(input.model));
	const { data, error } = await supabase.from("products").insert({
		id,
		slug,
		brand: input.brand,
		model: input.model,
		category: input.category,
		part_number: input.partNumber || null,
		compatible_printers: input.compatiblePrinters || null,
		image_url: input.imageUrl,
		description: input.description,
		stock: input.stock,
		inquiry_only: true
	}).select("*").single();
	if (error) throw new Error(`Failed to create product: ${error.message}`);
	return mapRow(data);
}
async function updateProduct(id, input) {
	const supabase = getSupabase();
	if (!await getProductById(id)) return null;
	const slug = await ensureUniqueSlug(slugify(input.model), id);
	const { data, error } = await supabase.from("products").update({
		slug,
		brand: input.brand,
		model: input.model,
		category: input.category,
		part_number: input.partNumber || null,
		compatible_printers: input.compatiblePrinters || null,
		image_url: input.imageUrl,
		description: input.description,
		stock: input.stock,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", id).select("*").maybeSingle();
	if (error) throw new Error(`Failed to update product: ${error.message}`);
	return data ? mapRow(data) : null;
}
async function deleteProduct(id) {
	const { data, error } = await getSupabase().from("products").delete().eq("id", id).select("id");
	if (error) throw new Error(`Failed to delete product: ${error.message}`);
	return Boolean(data && data.length > 0);
}
async function getClaimedAdminHash() {
	const { data, error } = await getSupabase().from("admin_config").select("password_hash").eq("id", 1).maybeSingle();
	if (error) throw new Error(`Failed to retrieve admin configuration: ${error.message}`);
	return data?.password_hash || null;
}
async function claimAdminPasswordHash(passwordHash) {
	const { error } = await getSupabase().from("admin_config").insert({
		id: 1,
		password_hash: passwordHash
	});
	if (error?.code === "23505") return false;
	if (error) throw new Error(`Failed to initialize admin access: ${error.message}`);
	return true;
}
async function recordInquiry(entry) {
	const { data, error } = await getSupabase().from("inquiries").insert({
		type: entry.type,
		name: entry.name,
		phone: entry.phone,
		organization: entry.organization || null,
		subject: entry.subject || null,
		message: entry.message || null,
		items_json: entry.items || []
	}).select("id").single();
	if (error) throw new Error(`Failed to save inquiry: ${error.message}`);
	return Number(data.id);
}
export { getClaimedAdminHash as a, getProductsByCategorySlug as c, getAllProducts as i, recordInquiry as l, createProduct as n, getProductBySlug as o, deleteProduct as r, getProductsByBrandSlug as s, claimAdminPasswordHash as t, updateProduct as u };
