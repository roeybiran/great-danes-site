import fetchDesignerWorks from 'lib/fetchDesignerWorks';
import Link from 'next/link';
import styled from 'styled-components';
import WorkCard from './ProductCard';

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  row-gap: var(--s3);
  justify-items: stretch;
`;

interface Props {
  works: Fulfilled<ReturnType<typeof fetchDesignerWorks>>;
}

export default function Works({ works }: Props) {
  return (
    <Wrapper className="sans" data-stagger>
      {works.map((w) => (
        <li key={w.id}>
          {w.isReady ? (
            <Link href={w.slug}>
              <a>
                <WorkCard work={w} />
              </a>
            </Link>
          ) : (
            <WorkCard work={w} />
          )}
        </li>
      ))}
    </Wrapper>
  );
}
