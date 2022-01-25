import { existsSync, readdirSync } from 'fs';

export default function _readdir(path: string) {
	if (!existsSync(path)) return [];
	return readdirSync(path).filter((x) => !x.startsWith('.'));
}
