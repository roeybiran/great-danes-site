import fs from 'fs';
import matter from 'gray-matter';
import { ARCHIVE_PATH } from 'lib/constants';
import prepareForNextImage from 'lib/util/prepareForNextImage';
import readdir from 'lib/util/readdir';
import slugify from 'lib/util/slugify';
import type { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';

let cache: Fulfilled<ReturnType<typeof getAllItems>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<Data>
) {
  const query = normalized(req.query.q as string);
  if (!cache) {
    cache = await getAllItems();
  }

  const designers = cache
    .filter(
      (des) =>
        des.searchName.includes(query) ||
        des.works.some((work) => work.materials.includes(query))
    )
    .map((des) => ({
      name: des.name,
      thumb: des.avatar,
      id: des.id,
      slug: slugify(des.name),
    }));

  const products = cache
    .flatMap((des) => des.works)
    .filter((work) => work.searchName.includes(query))
    .map((work) => ({
      name: work.name,
      thumb: work.thumb,
      id: work.id,
      slug: slugify(work.designer),
      designer: work.designer,
    }));

  res.status(200).json({ designers, products });
}

const getAllItems = async () => {
  const base = join(process.cwd(), ARCHIVE_PATH);
  return await Promise.all(
    readdir(base)
      .map((designer) => {
        const avatar = join(base, designer, 'avatar.jpg');
        const name = designer;
        const id = designer;
        const searchName = normalized(designer);

        const works = readdir(join(base, designer, 'works')).map((work) => {
          const folder = join(base, designer, 'works', work);
          const { data } = matter(
            fs.readFileSync(join(folder, 'product_story.md'), 'utf-8')
          );
          const materials = (data.materials as string[]) ?? [];
          const thumb = join(folder, 'thumb.png');
          const name = work.startsWith('unknown') ? 'Unknown Model' : work;
          const searchName = normalized(name + designer + materials.join(''));
          const id = designer + work;
          return {
            id,
            name,
            searchName,
            thumb,
            materials,
            designer,
          };
        });
        return {
          name,
          id,
          searchName,
          avatar,
          works,
        };
      })
      .map(async (designer) => {
        return {
          ...designer,
          works: await Promise.all(
            designer.works.map(async (x) => ({
              ...x,
              thumb: await prepareForNextImage(x.thumb),
            }))
          ),
          avatar: await prepareForNextImage(designer.avatar),
        };
      })
  );
};

const normalized = (s: string) => s.toLowerCase().replace(/\s/g, '');
