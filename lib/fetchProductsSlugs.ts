import fs from 'fs';
import path from 'path';
import { ARCHIVE_PATH } from './constants';
import slugify from './util/slugify';

export default function fetchProductsSlugs() {
  return fs
    .readdirSync(path.join(process.cwd(), ARCHIVE_PATH))
    .filter((designer) => !designer.startsWith('.'))
    .flatMap((designer) =>
      fs
        .readdirSync(path.join(process.cwd(), ARCHIVE_PATH, designer, 'works'))
        .filter((product) => {
          const model = path.join(
            process.cwd(),
            ARCHIVE_PATH,
            designer,
            'works',
            product,
            'model.glb'
          );
          return fs.existsSync(model);
        })
        .map((product) => ({
          product: slugify(product),
          designer: slugify(designer),
        }))
    );
}
