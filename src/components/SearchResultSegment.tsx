import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import CardSearchItem from './CardSearchItem';

interface Props {
  result: SearchResult;
}

const Wrapper = styled.div`
  > div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(140px, 100%), 1fr));
    row-gap: calc(3 * var(--flow-gap));
  }

  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--flow-gap);
    margin-bottom: var(--flow-gap);
    font-size: var(--font-size-5xl);
  }

  header p {
    font-size: var(--font-size-2xl);
  }
`;

const SearchResultSegment = ({ result }: Props) => {
  if (result.items.length === 0) return null;
  return (
    <Wrapper>
      <header>
        <h2>{result.header}</h2>
        {result.subheader && <p>{result.subheader}</p>}
      </header>
      <div>
        {result.items.map((res) => (
          <Link to="/archive/kay_bojesen/6">
            <CardSearchItem item={res} key={res.id} />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default SearchResultSegment;
