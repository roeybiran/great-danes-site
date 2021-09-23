import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import { ARCHIVE_PATH, UNKNOWN_MODEL } from 'lib/constants';
import prepareForNextImage from 'lib/util/prepareForNextImage';
import slugify from 'lib/util/slugify';
import path, { join } from 'path';
import normalized from './util/normalize';

export default async function fetchAllItems() {
  return await Promise.all(
    glob.sync(join(process.cwd(), ARCHIVE_PATH, '*')).map(async (_path) => {
      const designerName = _path.split(path.sep).slice(-1)[0];
      const id = designerName;
      const thumb = await prepareForNextImage(join(_path, 'avatar.jpg'));
      const designerSlug = path.join('/archive', slugify(designerName));
      const searchString = normalized(designerName);
      const type = 'designer';

      const products = await Promise.all(
        glob.sync(join(_path, 'works', '**/thumb.png')).map(async (_path) => {
          const type = 'product';
          const thumb = await prepareForNextImage(_path);
          const split = _path.split(path.sep);
          const _dirname = split.slice(-2)[0];
          const searchString = normalized(_dirname);
          const name = _dirname.startsWith('unknown')
            ? UNKNOWN_MODEL
            : _dirname;
          const id = designerName + _dirname;
          const { data } = matter(
            fs.readFileSync(
              join(split.slice(0, -1).join(path.sep), 'product_story.md'),
              'utf-8'
            )
          );
          const materials: string[] = data.materials ?? [];
          const slug = join(designerSlug, slugify(_dirname));
          return {
            name,
            slug,
            searchString,
            id,
            materials,
            thumb,
            type,
          };
        })
      );

      return {
        name: designerName,
        slug: designerSlug,
        searchString,
        id,
        thumb,
        type,
        products,
      };
    })
  );
}
