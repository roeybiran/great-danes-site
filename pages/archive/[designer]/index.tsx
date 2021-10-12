import BackToTop from '@/components/BackToTop';
import DefaultMeta from '@/components/defaultMeta';
import DesignerHeader from '@/components/designer/DesignerHeader';
import DesignerStory from '@/components/designer/DesignerStory';
import HeroImage from '@/components/designer/HeroImage';
import HeroQuote from '@/components/designer/HeroQuote';
import Summary from '@/components/designer/Summary';
import Works from '@/components/designer/Works';
import useStagger from '@/components/useStagger';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import fetchAllItems from 'lib/fetchAllItems';
import fetchSingleDesigner from 'lib/fetchSingleDesigner';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  ._stack > * + * {
    margin-block-start: var(--s3);
  }

  .back-to-top {
    margin-block-end: var(--s3);
  }
`;

export default function Designer({
  designer,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { avatar, hero, name, works, meta, mixedContent, quote } = designer!;

  const wrapperRef = useRef<HTMLDivElement>(null);
  useStagger(wrapperRef);

  return (
    <>
      <DefaultMeta pageTitle={name} />
      <Wrapper ref={wrapperRef}>
        <HeroQuote quote={quote} />
        <HeroImage img={hero} />
        <Center gutters="var(--s0)" max="none">
          <div className="_stack">
            <Stack space="var(--s3)" data-stagger>
              <DesignerHeader name={name} avatar={hero ? null : avatar} />
              <Stack space="var(--s1)">
                <h2 className="txt-m" id="works">
                  Works
                </h2>
                <Works works={works} />
              </Stack>
              <Stack space="var(--s1)">
                <h2 className="txt-m">Biography</h2>
                <Summary meta={meta} />
              </Stack>
            </Stack>
            <DesignerStory content={mixedContent} />
            <Center>
              <BackToTop />
            </Center>
          </div>
        </Center>
      </Wrapper>
    </>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const designer = await fetchSingleDesigner(params!.designer as string);
  return {
    props: {
      designer,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: (await fetchAllItems()).map(({ slug }) => ({
      params: { designer: slug },
    })),
    fallback: false,
  };
}
