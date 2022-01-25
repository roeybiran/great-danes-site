import fs from 'fs';
import path from 'path';
import { ARCHIVE_PATH } from '../constants';
import _readdir from '../util/_readdir';
import slugify from '../util/slugify';

export default function fetchProductsSlugs() {
	return _readdir(path.join(process.cwd(), ARCHIVE_PATH)).flatMap((designer) =>
		_readdir(path.join(process.cwd(), ARCHIVE_PATH, designer, 'works'))
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
