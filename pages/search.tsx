import DefaultMeta from '@/components/defaultMeta';
import SearchResultsSection from '@/components/SearchResultsSection';
import useDebounce from '@/components/useDebounce';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const noResults =
    (results.designers ?? []).concat(results.products ?? []).length === 0;
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
    const fetcher = async () => {
      const res = await fetch(`/api/search?q=${debouncedQuery}`).then((res) =>
        res.json()
      );
      setResults(res);
      setIsLoading(false);
    };
    fetcher();
  }, [debouncedQuery]);

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
                results={results?.designers}
                title="Designers"
              />
              <SearchResultsSection
                results={results?.products}
                title="Products"
              />
            </Stack>
          </Stack>
        </Center>
      </Wrapper>
    </>
  );
}
