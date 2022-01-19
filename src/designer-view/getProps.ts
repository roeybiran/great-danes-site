import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ARCHIVE_PATH } from '../constants';
import parseDesignerMeta from '../util/parseDesignerMeta';
import prepareForNextImage from '../util/prepareForNextImage';
import readdir from '../util/readdir';
import slugify from '../util/slugify';

export default async function getProps(designerSlug: string) {
	const baseFolder = process.cwd() + ARCHIVE_PATH;
	const name = readdir(baseFolder).find(
		(name) => slugify(name) === designerSlug
	)!;

	const avatarPath = path.join(baseFolder, name, 'avatar.jpg');
	const heroPath = path.join(baseFolder, name, 'hero.jpg');
	const bioPath = path.join(baseFolder, name, 'story.md');
	const worksPath = path.join(baseFolder, name, 'works');
	const bioGallery = path.join(baseFolder, name, 'story_gallery');

	let hero = null;
	if (fs.existsSync(heroPath)) {
		hero = await prepareForNextImage(heroPath, name);
	}

	let avatar = null;
	if (fs.existsSync(avatarPath)) {
		avatar = await prepareForNextImage(avatarPath, name);
	}

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

	const works = await fetchDesignerWorks(designerSlug, worksPath);

	return {
		name,
		avatar,
		hero,
		meta: parseDesignerMeta(data),
		mixedContent,
		works,
		quote: data.quote ?? null,
	};
}

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
			const _slug = path.join(slug, slugify(name));

			// console.log(_slug);

			return {
				name: name.startsWith('unknown') ? null : name,
				id,
				nickname: data.nickname,
				date: data.date,
				story: content,
				thumb,
				isReady,
				slug: _slug,
			};
		})
	);
};
