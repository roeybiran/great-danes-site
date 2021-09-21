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

  .no-results {
    color: var(--danish-red);
  }

  .product-designer {
    font-size: 0.8em;
  }
`;

export default function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState<any>({});

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      return;
    }
    const fetcher = async () => {
      const res = await fetch(`/api/search?q=${debouncedQuery}`).then((res) =>
        res.json()
      );
      setResults(res);
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
            <Stack aria-live="polite">
              {(results.designers ?? []).length === 0 &&
                (results.products ?? []).length === 0 &&
                (debouncedQuery.length > 0 ? (
                  <p className="no-results">
                    No results. Try a different search term.
                  </p>
                ) : (
                  <p className="no-results">
                    Search for designers, products...
                  </p>
                ))}
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
