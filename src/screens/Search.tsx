import { FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';

import SearchResultSegment from 'components/SearchResultSegment';

import parseQuery from 'util/queryParser';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: var(--danish-white);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--navbar-height);
    border-bottom: 1px solid var(--danish-red);
    width: 100%;
    z-index: 2;
  }

  .search-bar input {
    outline: none;
    background-color: var(--danish-white);
  }

  .close-button {
    color: var(--danish-red);
    border-width: 1px;
    border-color: var(--danish-red);
    border-radius: 8px;
    outline: none;
    height: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    letter-spacing: 0.05rem;
    transition-property: background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .close-button:hover,
  .close-button:focus,
  .close-button:active {
    background-color: var(--danish-red);
    color: var(--dark-mode-text);
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: calc(2 * var(--flow-gap));
    width: 100ch;
    margin-top: calc(var(--after-navbar-gap) / 2);
    margin-bottom: var(--after-navbar-gap);
  }
`;

interface Props {
  data: {
    craft: CraftTopic[];
    catalog: Designer[];
  };
}

const Search = ({ data }: Props) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  let timer: NodeJS.Timeout | null = null;

  const handleChange: FormEventHandler = (event) => {
    event.preventDefault();

    clearTimeout(timer!);

    timer = setTimeout(() => {
      const query = (event.target as HTMLInputElement).value;
      setSearchResults(parseQuery({ query, data }));
    }, 300);
  };

  let history = useHistory();

  return (
    <Wrapper>
      <div className="search-bar">
        <form>
          <input
            type="text"
            placeholder="Search the archive"
            autoFocus
            onInput={handleChange}
          ></input>
        </form>
        <div className="button-wrapper">
          <button
            type="button"
            className="close-button"
            onClick={(evt) => {
              evt.preventDefault();
              history.goBack();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
      <div className="results">
        {searchResults.map((res, idx) => (
          <SearchResultSegment result={res} key={res.header + idx} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Search;
