import path from 'path';
import { ARCHIVE_PATH } from './constants';
import readdir from './util/readdir';
import slugify from './util/slugify';

export default function fetchDesignersNamesAndSlugs() {
  return readdir(path.join(process.cwd(), ARCHIVE_PATH)).map((name) => {
    return {
      name,
      slug: slugify(name),
    };
  });
}
