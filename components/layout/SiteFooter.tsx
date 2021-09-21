import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 0.8em;
  border-block-start: 1px solid var(--danish-red);
  padding-block-start: var(--s0);
  padding-block-end: var(--s0);

  a {
    color: var(--danish-red);
    text-decoration: underline;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .title {
    font-weight: 500;
  }
`;

export default function Footer() {
  return (
    <Wrapper className="sans">
      <Center gutters="var(--s0)">
        <Stack space="var(--s-5)">
          <div className="flex">
            <p className="title uppercased">Great Danes</p>
            <Link href="/about">
              <a>About</a>
            </Link>
          </div>
          <p>A project by Roey Biran</p>
          <p>2021</p>
        </Stack>
      </Center>
    </Wrapper>
  );
}
