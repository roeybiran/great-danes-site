import BackToTop from '@/components/BackToTop';
import DefaultMeta from '@/components/defaultMeta';
import StyledBlockquote from '@/components/StyledBlockquote';
import useStagger from '@/components/useStagger';
import { Center } from '@roeybiran/every-layout-styled-components';
import { readFileSync } from 'fs';
import Markdown from 'markdown-to-jsx';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import { join } from 'path';
import React, { useRef } from 'react';
import styled from 'styled-components';
import img1 from '../public/cms/timeline/1.jpg';
import img2 from '../public/cms/timeline/2.jpg';
import img3 from '../public/cms/timeline/3.jpg';
import img4 from '../public/cms/timeline/4.jpg';

const Wrapper = styled.main`
  .stack > * + * {
    margin-block-start: var(--s1);
  }

  .next-image {
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  h2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  h2 > *:first-child {
    flex: auto;
  }
`;

export default function Timeline({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const wrapperRef = useRef(null);
  useStagger(wrapperRef);
  return (
    <>
      <DefaultMeta pageTitle="Timeline" />
      <Wrapper ref={wrapperRef}>
        <Markdown
          options={{
            wrapper: function Wrapper({ children, ...props }) {
              return (
                <div {...props} className="drop-cap stack" data-stagger>
                  {children}
                  <Center gutters="var(--s0)">
                    <BackToTop />
                  </Center>
                </div>
              );
            },
            forceWrapper: true,
            overrides: {
              h1: function Header({ children }: any) {
                return <h1 className="sr-only">{children}</h1>;
              },
              h2: function Header({ children }: any) {
                const [title, date] = children[0].split(',');
                return (
                  <Center gutters="var(--s0)" max="none">
                    <h2 className="txt-m" aria-label={children[0]} data-stagger>
                      <span aria-hidden>{title}</span>
                      <span aria-hidden>{date}</span>
                    </h2>
                  </Center>
                );
              },
              blockquote: function BQ({ children }: any) {
                return (
                  <Center max="80ch">
                    <StyledBlockquote>
                      <p>{children[0].props.children[0]}</p>
                    </StyledBlockquote>
                  </Center>
                );
              },
              p: function P({ children, ...props }: any) {
                if (children[0].type === 'img') {
                  const { src, alt } = children[0].props;
                  // return null;
                  const mapping = {
                    '1.jpg': img1,
                    '2.jpg': img2,
                    '3.jpg': img3,
                    '4.jpg': img4,
                  };
                  if (src in mapping) {
                    return (
                      <div className="next-image">
                        <Image
                          src={mapping[src as keyof typeof mapping]}
                          alt={alt as string}
                          placeholder="blur"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    );
                  }
                  throw new Error(`Unhandled embedded MD image: ${src}`);
                }
                return (
                  <Center gutters="var(--s0)">
                    <p {...props}>{children}</p>
                  </Center>
                );
              },
            },
          }}
        >
          {data}
        </Markdown>
      </Wrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const data = readFileSync(
    join(process.cwd(), 'public/cms/timeline/timeline.md'),
    'utf-8'
  );

  return {
    props: {
      data,
    },
  };
};
