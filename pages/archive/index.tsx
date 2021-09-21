import DefaultMeta from '@/components/defaultMeta';
import { Center, Grid, Stack } from '@roeybiran/every-layout-styled-components';
import fetchArchive from 'lib/fetchArchive';
import ROUTES from 'lib/routes';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  .grid {
    row-gap: var(--s2);
  }

  h2 {
    font-size: unset;
    margin-bottom: var(--s-1);
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default function Archive({
  designers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <DefaultMeta pageTitle="Archive" />
      <Wrapper>
        <Center gutters="var(--s0)" max="none">
          <header>
            <h1 className="txt-l fade-slide-up">Archive</h1>
          </header>
          <main>
            <Grid className="grid">
              {designers.map(([letter, names], idx) => (
                <div
                  className="fade-slide-up"
                  key={letter}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  <h2 className="txt-m">{letter}</h2>
                  <Stack as="ul" space="var(--s-3)" role="list">
                    {names.map(({ name, slug }) => (
                      <li key={name}>
                        <Link
                          href={`${ROUTES.Archive}/${encodeURIComponent(slug)}`}
                        >
                          {name}
                        </Link>
                      </li>
                    ))}
                  </Stack>
                </div>
              ))}
            </Grid>
          </main>
        </Center>
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      designers: fetchArchive(),
    },
  };
}
