import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { initialProducts } from '../src/data/products.ts';

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

if (!url || !secret) {
  throw new Error('Missing Supabase environment variables. Check your local .env file.');
}

const supabase = createClient(url, secret, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function seed() {
  const { data: existing, error: checkError } = await supabase
    .from('products')
    .select('id');

  if (checkError) throw checkError;

  if (existing.length !== 0) {
    throw new Error(`Import cancelled: products table contains ${existing.length} records.`);
  }

  const rows = initialProducts.map((product) => ({
    id: product.id,
    slug: product.slug,
    brand: product.brand,
    model: product.model,
    category: product.category,
    part_number: product.partNumber ?? null,
    compatible_printers: product.compatiblePrinters ?? null,
    image_url: product.imageUrl ?? null,
    description: product.description,
    stock: product.stock,
    inquiry_only: product.inquiryOnly,
  }));

  if (rows.length !== 16) {
    throw new Error(`Expected 16 products, found ${rows.length}. Import cancelled.`);
  }

  const { data, error } = await supabase
    .from('products')
    .insert(rows)
    .select('id, slug');

  if (error) throw error;

  console.log(`Successfully imported ${data.length} products.`);

  const { data: verified, error: verifyError } = await supabase
    .from('products')
    .select('id');

  if (verifyError) throw verifyError;

  console.log(`Supabase verification: ${verified.length} products found.`);
}

seed().catch((error) => {
  console.error('Product import failed:', error.message);
  process.exitCode = 1;
});
