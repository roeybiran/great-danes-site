import { join } from 'path';
import { cwd } from 'process';
import _readdir from '../util/_readdir';
import slugify from '../util/slugify';

export default function getPaths() {
	const paths = _readdir(join(cwd(), 'public/cms/archive')).map(slugify);
	return paths;
}
