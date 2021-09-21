import { readdirSync } from 'fs';

export default function readdir(path: string) {
  return readdirSync(path).filter((x) => !x.startsWith('.'));
}
