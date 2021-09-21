import fetchDesignersNamesAndSlugs from './fetchDesignersNamesAndSlugs';

export default function fetchArchive() {
  return Object.entries(
    fetchDesignersNamesAndSlugs()
      .map(({ name, slug }) => {
        return {
          indexLetter: name.split(' ').slice(-1)[0][0],
          slug,
          name,
        };
      })
      .reduce<{ [k: string]: { name: string; slug: string }[] }>(
        (acc, current) => {
          return {
            ...acc,
            [current.indexLetter]: [
              ...(acc[current.indexLetter] ?? []),
              {
                name: current.name,
                slug: current.slug,
              },
            ],
          };
        },
        {}
      )
  ).sort((a, b) => (a[0] < b[0] ? -1 : 1));
}
