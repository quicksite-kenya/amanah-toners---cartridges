import { randomUUID } from 'node:crypto';
import { getSupabase } from './supabase';
import type { Product } from '../data/products';
import type { Json } from './database.types';

interface ProductRow {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  part_number: string | null;
  compatible_printers: string | null;
  image_url: string;
  description: string;
  stock: number;
  inquiry_only: boolean;
  created_at?: string;
  updated_at?: string;
}

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
    inquiryOnly: Boolean(row.inquiry_only),
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function getAllProducts(): Promise<Product[]> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);

  return (data || []).map((row) => mapRow(row as ProductRow));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch product: ${error.message}`);

  return data ? mapRow(data as ProductRow) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch product: ${error.message}`);

  return data ? mapRow(data as ProductRow) : null;
}

export async function getProductsByBrandSlug(
  brandSlug: string
): Promise<{ brand: string | null; products: Product[] }> {
  const all = await getAllProducts();

  const matched = all.filter(
    (product) => slugify(product.brand) === brandSlug.toLowerCase()
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
    (product) => slugify(product.category) === categorySlug.toLowerCase()
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

    if (error) {
      throw new Error(`Failed to check product slug: ${error.message}`);
    }

    if (!data) return candidate;

    candidate = `${cleanBase}-${counter}`;
    counter++;
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const supabase = getSupabase();

  const id = `p_${randomUUID()}`;
  const slug = await ensureUniqueSlug(slugify(input.model));

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
    })
    .select('*')
    .single();

  if (error) throw new Error(`Failed to create product: ${error.message}`);

  return mapRow(data as ProductRow);
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

  if (error) throw new Error(`Failed to update product: ${error.message}`);

  return data ? mapRow(data as ProductRow) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) throw new Error(`Failed to delete product: ${error.message}`);

  return Boolean(data && data.length > 0);
}

export async function getClaimedAdminHash(): Promise<string | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('admin_config')
    .select('password_hash')
    .eq('id', 1)
    .maybeSingle();

  if (error) throw new Error(`Failed to retrieve admin configuration: ${error.message}`);

  return data?.password_hash || null;
}

export async function claimAdminPasswordHash(
  passwordHash: string
): Promise<boolean> {
  const supabase = getSupabase();

  const { error } = await supabase
    .from('admin_config')
    .insert({
      id: 1,
      password_hash: passwordHash,
    });

  if (error?.code === '23505') {
    return false;
  }

  if (error) {
    throw new Error(`Failed to initialize admin access: ${error.message}`);
  }

  return true;
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
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      type: entry.type,
      name: entry.name,
      phone: entry.phone,
      organization: entry.organization || null,
      subject: entry.subject || null,
      message: entry.message || null,
      items_json: (entry.items || []) as Json[],
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to save inquiry: ${error.message}`);

  return Number(data.id);
}


