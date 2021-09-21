import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ARCHIVE_PATH } from './constants';
import getPublicPath from './util/getPublicPath';
import prepareForNextImage from './util/prepareForNextImage';
import slugify from './util/slugify';

interface ProductMeta {
  nickname?: string;
  brand?: string;
  product_url?: string;
  dimensions_cm?: { w: number; h: number; d: number };
  categories?: string[];
  materials?: string[];
  date?: number;
}

export default async function fetchSingleProduct(
  designerSlug: string,
  proudctSlug: string
) {
  const baseDir = process.cwd() + ARCHIVE_PATH;
  const designer = fs
    .readdirSync(baseDir)
    .find((name) => slugify(name) === designerSlug);

  if (!designer) return;

  const product = fs
    .readdirSync(path.join(baseDir, designer, 'works'))
    .find((f) => slugify(f) === proudctSlug);

  if (!product) return;

  const productDir = path.join(baseDir, designer, 'works', product);
  const { data, content } = matter(
    fs.readFileSync(path.join(productDir, 'product_story.md'), 'utf-8')
  );

  const {
    nickname,
    brand,
    product_url: shopUrl,
    dimensions_cm: dimensions,
    categories,
    materials,
    date,
  } = data as ProductMeta;

  const model = path.join(productDir, 'model.glb');

  const gallery = await Promise.all(
    fs
      .readdirSync(path.join(productDir, 'product_gallery'))
      .filter((f) => !f.startsWith('.'))
      .map(
        async (p) =>
          await prepareForNextImage(path.join(productDir, 'product_gallery', p))
      )
  );

  const videos = fs
    .readdirSync(path.join(productDir, 'product_videos'))
    .filter((f) => !f.startsWith('.'))
    .map((v) => getPublicPath(path.join(productDir, 'product_videos', v)));

  return {
    designer: {
      name: designer,
      slug: slugify(designer),
    },
    id: `${designerSlug}-${proudctSlug}`,
    name: product.startsWith('unknown') ? null : product,
    nickname: nickname ?? null,
    date: date ?? null,
    manufacturer: brand ?? null,
    categories: categories ?? [],
    materials: materials ?? [],
    url: shopUrl ?? null,
    dimensions: dimensions
      ? `${dimensions.w}x${dimensions.h}x${dimensions.d} (WxHxD)`
      : null,
    content,
    videos,
    gallery,
    model,
  };
}
