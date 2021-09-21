import { join } from 'path';
import prepareForNextImage from './util/prepareForNextImage';
import slugify from './util/slugify';
import { ARCHIVE_PATH } from './constants';
import readdir from './util/readdir';

const fetchAllWorks = async () => {
  const base = join(process.cwd(), ARCHIVE_PATH);
  return await Promise.all(
    readdir(base).flatMap((designer) => {
      const designerName = designer;
      const designerSlug = slugify(designer);
      return readdir(join(base, designer, 'works')).map(async (work) => {
        const workName = work;
        const workSlug = slugify(work);
        const thumb = await prepareForNextImage(
          join(base, designer, 'works', work, 'thumb.png')
        );
        return { designerName, designerSlug, workName, workSlug, thumb };
      });
    })
  );
};

export default fetchAllWorks;
