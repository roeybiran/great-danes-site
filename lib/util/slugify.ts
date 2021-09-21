export default function slugify(s: string) {
  return s.replace(/\s/g, '-').toLowerCase();
}
