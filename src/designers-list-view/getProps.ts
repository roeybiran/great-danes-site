import { basename, join } from 'path';
import readdir from '../util/readdir';
import slugify from '../util/slugify';

export default async function getProps() {
	const basePath = join(process.cwd(), 'public/cms/archive');
	const names = readdir(basePath).map((f) => {
		const name = basename(f);
		const slug = `/designer/${encodeURIComponent(slugify(name))}`;
		// first letter of family name
		const indexLetter = name.split(' ').slice(-1)[0][0];
		return {
			indexLetter,
			slug,
			name,
		};
	});

	const result: { [k: string]: { name: string; slug: string }[] } = {};
	for (let index = 0; index < names.length; index++) {
		const { name, slug, indexLetter } = names[index];
		result[indexLetter] = (result[indexLetter] ?? []).concat({ name, slug });
	}

	return Object.entries(result)
		.sort((tupleA, tupleB) => {
			return tupleA[0].localeCompare(tupleB[0]);
		})
		.map(([letter, names]) => {
			const x: [string, { name: string; slug: string }[]] = [
				letter,
				names.sort((a, b) => a.name.localeCompare(b.name)),
			];
			return x;
		});
}
