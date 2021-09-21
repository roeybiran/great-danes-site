import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import prepareForNextImage from './util/prepareForNextImage';
import slugify from './util/slugify';
import readdir from './util/readdir';

const fetchDesignerWorks = async (slug: string, baseFolder: string) => {
  return await Promise.all(
    readdir(baseFolder).map(async (productFolder) => {
      const name = productFolder;
      const id = productFolder;
      const dirname = path.join(baseFolder, productFolder);

      const storyPath = path.join(dirname, 'product_story.md');
      const isReady = fs.existsSync(path.join(dirname, 'model.glb'));

      const thumb = await prepareForNextImage(path.join(dirname, 'thumb.png'));

      const { data, content } = matter(fs.readFileSync(storyPath, 'utf-8'));

      return {
        name: name.startsWith('unknown') ? null : name,
        id,
        nickname: data.nickname,
        date: data.date,
        story: content,
        thumb,
        isReady,
        slug: slug + '/' + slugify(name),
      };
    })
  );
};

export default fetchDesignerWorks;
