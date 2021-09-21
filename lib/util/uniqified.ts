export default function uniqified<T>(arg: T[]) {
  return arg.reduce<T[]>(
    (prev, curr) => Array.from(new Set([...prev, curr!])),
    []
  );
}
