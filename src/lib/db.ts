
import { getSupabase } from './supabase';
import type { Database, Json } from './database.types';
import { initialProducts, type Product } from '../data/products';

type ProductRow = Database['public']['Tables']['products']['Row'];

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    category: row.category,
    partNumber: row.part_number || undefined,
    compatiblePrinters: row.compatible_printers || undefined,
    imageUrl: row.image_url,
    description: row.description,
    stock: row.stock,
    inquiryOnly: row.inquiry_only,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Seed the original catalogue only when the products table is empty.
// ignoreDuplicates prevents overwriting products already in Supabase.
async function seedProductsIfEmpty(): Promise<void> {
  const supabase = getSupabase();

  const { count, error } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true });

  if (error) throw error;

  if (count === 0) {
    const now = new Date().toISOString();

    const rows = initialProducts.map((p) => ({
      id: p.id,
      slug: p.slug,
      brand: p.brand,
      model: p.model,
      category: p.category,
      part_number: p.partNumber || null,
      compatible_printers: p.compatiblePrinters || null,
      image_url: p.imageUrl,
      description: p.description,
      stock: p.stock,
      inquiry_only: p.inquiryOnly,
      created_at: now,
      updated_at: now,
    }));

    const { error: insertError } = await supabase
      .from('products')
      .upsert(rows, {
        onConflict: 'id',
        ignoreDuplicates: true,
      });

    if (insertError) throw insertError;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  await seedProductsIfEmpty();

  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data || []).map(mapRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await seedProductsIfEmpty();

  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await getSupabase()
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function getProductsByBrandSlug(
  brandSlug: string
): Promise<{ brand: string | null; products: Product[] }> {
  const all = await getAllProducts();
  const matched = all.filter(
    (p) => slugify(p.brand) === brandSlug.toLowerCase()
  );

  return {
    brand: matched.length > 0 ? matched[0].brand : null,
    products: matched,
  };
}

export async function getProductsByCategorySlug(
  categorySlug: string
): Promise<{ category: string | null; products: Product[] }> {
  const all = await getAllProducts();
  const matched = all.filter(
    (p) => slugify(p.category) === categorySlug.toLowerCase()
  );

  return {
    category: matched.length > 0 ? matched[0].category : null,
    products: matched,
  };
}

export interface ProductInput {
  brand: string;
  model: string;
  category: string;
  partNumber?: string;
  compatiblePrinters?: string;
  imageUrl: string;
  description: string;
  stock: number;
}

async function ensureUniqueSlug(
  baseSlug: string,
  excludeId?: string
): Promise<string> {
  const supabase = getSupabase();
  const cleanBase = baseSlug || 'product';
  let candidate = cleanBase;
  let counter = 2;

  while (true) {
    let query = supabase
      .from('products')
      .select('id')
      .eq('slug', candidate);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) throw error;
    if (!data) return candidate;

    candidate = `${cleanBase}-${counter}`;
    counter++;
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const supabase = getSupabase();
  const id =
    'p_' +
    Date.now().toString(36) +
    '_' +
    Math.random().toString(36).slice(2, 6);

  const slug = await ensureUniqueSlug(slugify(input.model));
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('products')
    .insert({
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
      inquiry_only: true,
      created_at: now,
      updated_at: now,
    })
    .select('*')
    .single();

  if (error) throw error;

  return mapRow(data);
}

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<Product | null> {
  const supabase = getSupabase();
  const existing = await getProductById(id);

  if (!existing) return null;

  const slug = await ensureUniqueSlug(slugify(input.model), id);

  const { data, error } = await supabase
    .from('products')
    .update({
      slug,
      brand: input.brand,
      model: input.model,
      category: input.category,
      part_number: input.partNumber || null,
      compatible_printers: input.compatiblePrinters || null,
      image_url: input.imageUrl,
      description: input.description,
      stock: input.stock,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throw error;

  return data ? mapRow(data) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { data, error } = await getSupabase()
    .from('products')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) throw error;

  return (data?.length || 0) > 0;
}

export async function getClaimedAdminHash(): Promise<string | null> {
  const { data, error } = await getSupabase()
    .from('admin_config')
    .select('password_hash')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw error;

  return data?.password_hash || null;
}

export async function claimAdminPasswordHash(
  passwordHash: string
): Promise<boolean> {
  const { data, error } = await getSupabase()
    .from('admin_config')
    .insert({
      id: 1,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .maybeSingle();

  if (error?.code === '23505') return false;
  if (error) throw error;

  return Boolean(data);
}

export async function recordInquiry(entry: {
  type: 'contact' | 'quote';
  name: string;
  phone: string;
  organization?: string;
  subject?: string;
  message?: string;
  items?: unknown[];
}): Promise<number> {
  const { data, error } = await getSupabase()
    .from('inquiries')
    .insert({
      type: entry.type,
      name: entry.name,
      phone: entry.phone,
      organization: entry.organization || null,
      subject: entry.subject || null,
      message: entry.message || null,
      items_json: (entry.items || []) as Json,
    })
    .select('id')
    .single();

  if (error) throw error;

  return Number(data.id);
}
