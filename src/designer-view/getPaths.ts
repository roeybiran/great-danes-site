import { join } from 'path';
import { cwd } from 'process';
import readdir from '../util/readdir';
import slugify from '../util/slugify';

export default async function getPaths() {
	const paths = readdir(join(cwd(), 'public/cms/archive')).map(slugify);
	return paths;
}
