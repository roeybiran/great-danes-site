import BaseScene from '@/components/3d/scenes';
import Scene from '@/components/3d/scenes/IntroductionScene';
import DefaultMeta from '@/components/defaultMeta';
import NextLinkOrAnchor from '@/components/NextLinkOrAnchor';
import useStagger from '@/components/useStagger';
import { Center, Cover } from '@roeybiran/every-layout-styled-components';
import { readFileSync } from 'fs';
import Markdown from 'markdown-to-jsx';
import { InferGetStaticPropsType } from 'next';
import { join } from 'path';
import React, { useRef } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Wrapper = styled.div`
  padding-block-start: var(--s1);
  padding-block-end: var(--s1);
`;

export default function Introduction({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const wrapperRef = useRef(null);
  useStagger(wrapperRef);

  return (
    <>
      <DefaultMeta pageTitle={'Introduction'} />
      <CanvasContainer>
        <BaseScene>
          <Scene />
        </BaseScene>
      </CanvasContainer>
      <Wrapper ref={wrapperRef}>
        <Center gutters="var(--s0)">
          <Markdown
            options={{
              wrapper: function Wrapper(props) {
                return <div className="drop-cap" data-stagger {...props} />;
              },
              overrides: {
                h1: function Header({ children }: any) {
                  return (
                    <header>
                      <h1 className="txt-l">{children}</h1>
                    </header>
                  );
                },
                a: NextLinkOrAnchor,
              },
            }}
          >
            {data}
          </Markdown>
        </Center>
      </Wrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const data = readFileSync(
    join(process.cwd(), 'public/cms/introduction.md'),
    'utf-8'
  );

  return {
    props: {
      data,
    },
  };
};
