import upperCaseFirst from './upperCaseFirst';

interface Props {
  query: string;
  data: {
    craft: CraftTopic[];
    catalog: Designer[];
  };
}

const START_OF_CAREER_AGE = 40;
const PRODUCT_DATE_ALLOWANCE = 3;

const parseQuery = ({ query, data }: Props): SearchResult[] => {
  let normalizedQuery = normalized(query);
  if (normalizedQuery.length < 2) return [];

  // date-based search
  const asNumber = Number(normalizedQuery);
  if (asNumber) {
    return dateBasedSearch(asNumber, data);
  }

  const flattenedProducts = data.catalog.flatMap((d) => d.works);
  const searchByMaterial = flattenedProducts.findIndex((p) =>
    p.materials.includes(normalizedQuery as ProductMaterial)
  );
  if (searchByMaterial > -1) {
    return tagBasedSearch(normalizedQuery, data);
  }

  // TODO
  // const searchByCategory = flattenedProducts.findIndex((p) =>
  //   p.categories.includes(normalizedQuery as ProductCategory)
  // );

  // name-based search
  return nameBasedSearch(normalizedQuery, data);
};

export default parseQuery;

/* UTILS */

const circa = (lowerBound: number, upperBound: number, target: number) => {
  return lowerBound <= target && target <= upperBound;
};

const normalized = (s: string) => s.toLowerCase().replaceAll(/\W/g, '');

const designerToSearchItem = (designer: Designer): SearchResultItem => ({
  title: `${designer.firstName} ${designer.lastName}`,
  thumbSrc: designer.avatarSrc,
  id: designer.designerId,
  type: 'designer',
});

const productToSearchItem = (product: Product): SearchResultItem => ({
  title: product.model!,
  thumbSrc: product.thumbSrc,
  id: product.productId,
  type: 'product',
});

const tagBasedSearch = (
  query: string,
  { catalog }: Props['data']
): SearchResult[] => {
  const designers = catalog
    .map((designer) => {
      const worksCount = designer.works.filter((w) =>
        w.materials.includes(query as ProductMaterial)
      ).length;
      return { designer, worksCount };
    })
    .sort((a, b) => b.worksCount - a.worksCount)
    .slice(0, 5)
    .map((d) => d.designer);

  const products = designers.flatMap((d) => {
    return d.works.filter(
      (p) => p.model && p.materials.includes(query as ProductMaterial)
    );
  });

  return [
    {
      header: 'Designers',
      subheader: `${upperCaseFirst(query)} specialists`,
      items: designers.map(designerToSearchItem),
    },
    {
      header: 'Products',
      subheader: `${upperCaseFirst(query)} masterpieces`,
      items: products.map(productToSearchItem),
    },
  ];
};

const dateBasedSearch = (
  query: number,
  { catalog }: Props['data']
): SearchResult[] => {
  const designers = catalog
    .filter((designer) => {
      const lower = designer.birth + START_OF_CAREER_AGE;
      const upper = designer.death ?? new Date().getFullYear();
      return circa(lower, upper, query);
    })
    .map(designerToSearchItem);

  const products = catalog.flatMap((designer) => {
    return designer.works
      .filter((product) => {
        return (
          product.model &&
          circa(
            product.date - PRODUCT_DATE_ALLOWANCE,
            product.date + PRODUCT_DATE_ALLOWANCE,
            query
          )
        );
      })
      .map(productToSearchItem);
  });

  return [
    {
      header: 'Designers',
      subheader: `Active through ${query}`,
      items: designers,
    },
    {
      header: 'Products',
      subheader: `Manufactured around ${query}`,
      items: products,
    },
  ];
};

const nameBasedSearch = (
  query: string,
  { catalog }: Props['data']
): SearchResult[] => {
  const designers = catalog
    .filter((designer) => {
      return normalized(
        [designer.firstName, designer.lastName].join()
      ).includes(query);
    })
    .map(designerToSearchItem);

  const products = catalog.flatMap((designer) => {
    return designer.works
      .filter((work) => {
        const token = normalized((work.model ?? '') + (work.nickname ?? ''));
        return token.includes(query);
      })
      .map(productToSearchItem);
  });

  return [
    { header: 'Designers', items: designers },
    { header: 'Products', items: products },
  ];
};
