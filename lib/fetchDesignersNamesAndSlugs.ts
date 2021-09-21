import fs from 'fs';
import path from 'path';
import { ARCHIVE_PATH } from './constants';
import slugify from './util/slugify';

export default function fetchDesignersNamesAndSlugs() {
  return fs
    .readdirSync(path.join(process.cwd(), ARCHIVE_PATH))
    .filter((name) => !name.startsWith('.'))
    .map((name) => {
      return {
        name,
        slug: slugify(name),
      };
    });
}
