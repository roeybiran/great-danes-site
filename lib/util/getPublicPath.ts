export default function getPublicPath(path: string) {
  return path.replace(/^.+?public/, '');
}
