import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ARCHIVE_PATH } from './constants';
import fetchDesignerWorks from './fetchDesignerWorks';
import parseDesignerMeta from './util/parseDesignerMeta';
import prepareForNextImage from './util/prepareForNextImage';
import readdir from './util/readdir';
import slugify from './util/slugify';

export default async function fetchSingleDesigner(slug: string) {
  const baseFolder = process.cwd() + ARCHIVE_PATH;
  const name = readdir(baseFolder).find((name) => slugify(name) === slug);

  if (!name) return;

  const avatarPath = path.join(baseFolder, name, 'avatar.jpg');
  const heroPath = path.join(baseFolder, name, 'hero.jpg');
  const bioPath = path.join(baseFolder, name, 'story.md');
  const worksPath = path.join(baseFolder, name, 'works');
  const bioGallery = path.join(baseFolder, name, 'story_gallery');

  let hero = null;
  if (fs.existsSync(heroPath)) {
    const heroImgData = await prepareForNextImage(heroPath, name);
    hero = {
      ...heroImgData,
    };
  }

  const avatarImgData = await prepareForNextImage(avatarPath, name);

  const { data, content } = matter(
    fs.readFileSync(bioPath, 'utf-8').replace(/^#$/gm, '')
  );

  const bioPics = await Promise.all(
    readdir(bioGallery).map(
      async (img) => await prepareForNextImage(path.join(bioGallery, img), name)
    )
  );

  const paragraphs = content
    .trim()
    .split('\n')
    .filter((x) => x);

  const maxArrayLength = Math.max(bioPics.length, paragraphs.length);

  let mixedContent: (string | typeof bioPics[0])[] = [];
  let i = 0;
  while (i < maxArrayLength) {
    if (i < paragraphs.length) {
      mixedContent.push(paragraphs[i]);
    }
    if (i < bioPics.length) {
      mixedContent.push(bioPics[i]);
    }
    i += 1;
  }

  const works = await fetchDesignerWorks(slug, worksPath);

  return {
    name,
    avatar: {
      ...avatarImgData,
    },
    hero,
    meta: parseDesignerMeta(data),
    mixedContent,
    works,
    quote: data.quote ?? null,
  };
}
