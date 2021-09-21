import { existsSync, readdirSync } from 'fs';

export default function readdir(path: string) {
  return existsSync(path)
    ? readdirSync(path).filter((x) => !x.startsWith('.'))
    : [];
}
