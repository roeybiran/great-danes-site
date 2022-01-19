import { existsSync, readdirSync } from 'fs';

export default function readdir(path: string) {
  if (!existsSync(path)) throw new Error();
  return readdirSync(path).filter((x) => !x.startsWith('.'));
}
