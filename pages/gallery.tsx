import BackToTop from '@/components/BackToTop';
import DefaultMeta from '@/components/defaultMeta';
import useStagger from '@/components/useStagger';
import { Center, Grid, Stack } from '@roeybiran/every-layout-styled-components';
import fetchAllItems from 'lib/fetchAllItems';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  .grid {
    justify-items: center;
    row-gap: var(--s5);
  }
`;

export default function Gallery(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { products } = props;
  const wrapperRef = useRef(null);
  useStagger(wrapperRef, false);

  return (
    <>
      <DefaultMeta pageTitle="Gallery" />
      <Wrapper ref={wrapperRef}>
        <Center max="none" gutters="var(--s0)">
          <Stack space="var(--s3)">
            <h1 className="txt-l fade-slide-up">Gallery</h1>
            <Grid className="grid" data-stagger>
              {products.map(
                ({
                  designerName,
                  designerSlug,
                  name: workName,
                  slug: workSlug,
                  thumb,
                }) => (
                  <div key={designerSlug + workSlug}>
                    <Link href={`${designerSlug}#works`}>
                      <a>
                        <Image
                          src={thumb.src}
                          // width={thumb.width}
                          // height={thumb.height}
                          width={72}
                          height={72}
                          objectFit="contain"
                          blurDataURL={thumb.blurDataUrl}
                          alt={`${workName}, by ${designerName}`}
                          placeholder="blur"
                        />
                      </a>
                    </Link>
                  </div>
                )
              )}
            </Grid>
            <BackToTop />
          </Stack>
        </Center>
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const products = (await fetchAllItems())
    .map((designer) =>
      designer.products.map((prdct) => ({
        ...prdct,
        designerName: designer.name,
        designerSlug: designer.slug,
      }))
    )
    .reduce((prev, curr) => prev.concat(curr));
  return {
    props: { products },
  };
}
