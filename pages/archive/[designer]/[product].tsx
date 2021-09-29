import models from '@/components/3d/models';
import BaseScene from '@/components/3d/scenes';
import Scene from '@/components/3d/scenes/ProductScene';
import BackToTop from '@/components/BackToTop';
import DefaultMeta from '@/components/defaultMeta';
import Gallery from '@/components/product/Gallery';
import Summary from '@/components/product/Summary';
import Videos from '@/components/product/Videos';
import useStagger from '@/components/useStagger';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import { UNKNOWN_MODEL } from 'lib/constants';
import fetchProductsSlugs from 'lib/fetchProductsSlugs';
import fetchSingleProduct from 'lib/fetchSingleProduct';
import Markdown from 'markdown-to-jsx';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  margin-block-start: calc(-1 * (var(--s3)));
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;

  > * {
    flex: auto;
  }

  a {
    flex-wrap: wrap;
    gap: var(--s1);
    margin-inline-start: var(--s1);
    margin-block-end: var(--s1);
    text-decoration: underline;
  }
`;

const Wrapper = styled.main`
  .content,
  header {
    display: flex;
    flex-wrap: wrap;
  }

  header {
    align-items: baseline;
    gap: var(--s0);
  }

  .content {
    gap: var(--s2);
  }

  .nickname {
    font-size: var(--s2);
    font-style: italic;
  }

  dl a {
    text-decoration: underline;
  }

  h2 {
    margin-block-end: var(--s0);
  }
`;

export default function Product({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { name, nickname, content, videos, gallery, id } = product!;

  const wrapperRef = useRef(null);
  useStagger(wrapperRef, false);

  return (
    <>
      <DefaultMeta pageTitle={name ?? UNKNOWN_MODEL} />
      <CanvasContainer>
        <div className="inner">
          {models[id] && (
            <BaseScene>
              <Scene>{models[id](true)}</Scene>
            </BaseScene>
          )}
        </div>
        <div>
          <Link href="#header">
            <a className="txt-m">Info</a>
          </Link>
        </div>
      </CanvasContainer>
      <Wrapper ref={wrapperRef}>
        <Center max="none" gutters="var(--s0)">
          <header id="header" data-stagger>
            <h1 className="txt-l">{name ?? UNKNOWN_MODEL}</h1>
            {nickname && <p className="nickname">the {nickname}</p>}
          </header>
          <Stack space="var(--s3)">
            <div className="content">
              <aside>
                <Summary {...product!} />
              </aside>
              <Markdown className="drop-cap" data-stagger>
                {content}
              </Markdown>
            </div>
            <Gallery gallery={gallery} />
            <Videos videos={videos} />
            <BackToTop />
          </Stack>
        </Center>
      </Wrapper>
    </>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const product = await fetchSingleProduct(
    params!.designer as string,
    params!.product as string
  );
  return {
    props: { product },
    notFound: !product,
  };
}

export async function getStaticPaths() {
  const paths = fetchProductsSlugs().map(({ product, designer }) => ({
    params: { product, designer },
  }));

  return {
    paths,
    fallback: false,
  };
}
