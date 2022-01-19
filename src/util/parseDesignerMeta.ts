export default function parseDesignerMeta(data: any) {
  const {
    birth,
    death,
    birth_place,
    resting_place,
    education,
    spouses,
    children,
    awards,
  } = data;

  const result: ({ key: string; value: string[] } | null)[] = [
    { key: 'Born', value: [birth] },
    death ? { key: 'Died', value: [death] } : null,
    birth_place ? { key: 'Birthplace', value: [birth_place] } : null,
    resting_place ? { key: 'Resting Place', value: [resting_place] } : null,
    education.length > 0 ? { key: 'Education', value: education } : null,
    spouses.length > 0
      ? {
          key: spouses.length > 1 ? 'Spouses' : 'Spouse',
          value: spouses.map(
            ({ name, info }: { name: string; info: string }) =>
              `${name}, (${info})`
          ),
        }
      : null,
    children.length > 0 ? { key: 'Children', value: children } : null,
    awards.length > 0
      ? {
          key: 'Awards',
          value: awards.map(
            ({ name, date }: { name: string; date: number }) =>
              `${name}, ${date}`
          ),
        }
      : null,
  ];

  return result;
}
