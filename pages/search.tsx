import DefaultMeta from '@/components/defaultMeta';
import SearchResultsSection from '@/components/SearchResultsSection';
import useDebounce from '@/components/useDebounce';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { InferGetStaticPropsType } from 'next';
import fetchAllItems from 'lib/fetchAllItems';
import normalized from 'lib/util/normalize';

const Wrapper = styled.main`
  input {
    width: 100%;
    appearance: none;
    border: 2px solid var(--danish-red);
    border-radius: 4px;
  }

  a {
    text-decoration: underline;
  }

  .unknown {
    font-style: italic;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(120px, 100%), 1fr));
    gap: var(--s2);
  }

  .message {
    color: var(--danish-red);
  }

  .product-designer {
    font-size: 0.8em;
  }
`;

export interface SearchResult {
  label: string;
  thumb: CustomImage;
  id: string;
  slug: string;
  type: string;
}

export default function Search({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(normalized(query), 500);

  const noResults = results.length === 0;
  const noQuery = debouncedQuery.length === 0;

  let message = null;
  if (noResults && !noQuery && !isLoading) {
    message = 'No results. Try a different search term.';
  } else if (noResults && noQuery) {
    message = 'Search for designers, products...';
  } else if (isLoading) {
    message = 'Loading';
  }

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const results = [...data, ...data.flatMap((d) => d.products)]
      .filter((d) => d.searchString.includes(debouncedQuery))
      .map((item) => ({
        label: item.name,
        thumb: item.thumb,
        id: item.id,
        slug: item.slug,
        type: item.type,
      }));
    setResults(results);
    setIsLoading(false);
  }, [debouncedQuery, data]);

  return (
    <>
      <DefaultMeta pageTitle="Search" />
      <Wrapper className="fade-slide-up sans">
        <h1 className="sr-only">Search</h1>
        <Center gutters="var(--s0)">
          <Stack>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="sr-only" htmlFor="search-field">
                Search
              </label>
              <input
                id="search-field"
                type="search"
                placeholder="Search"
                onInput={(e) => {
                  setQuery((e.target as HTMLInputElement).value.trim());
                }}
              />
            </form>
            <Stack aria-live="polite" aria-busy={isLoading}>
              {message && <p className="message">{message}</p>}
              <SearchResultsSection
                results={results.filter((x) => x.type === 'designer')}
                title="Designers"
              />
              <SearchResultsSection
                results={results.filter((x) => x.type === 'product')}
                title="Products"
              />
            </Stack>
          </Stack>
        </Center>
      </Wrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const results = await fetchAllItems();

  return {
    props: {
      data: results,
    },
  };
};
