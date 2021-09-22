import DefaultMeta from '@/components/defaultMeta';
import useStagger from '@/components/useStagger';
import { Center, Grid, Stack } from '@roeybiran/every-layout-styled-components';
import fs from 'fs';
import matter from 'gray-matter';
import { ARCHIVE_PATH, CMS_PATH } from 'lib/constants';
import prepareForNextImage from 'lib/util/prepareForNextImage';
import readdir from 'lib/util/readdir';
import slugify from 'lib/util/slugify';
import upperCaseFirst from 'lib/util/upperCaseFirst';
import Markdown from 'markdown-to-jsx';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { join } from 'path';
import { useRef } from 'react';
import styled from 'styled-components';

const craftDir = join(CMS_PATH, 'craft');

const Wrapper = styled.main`
  .img-container {
    position: relative;
  }

  .hero {
    margin-block-start: calc(-1 * (var(--s3)));
    width: 100vw;
    height: 90vh;
  }

  a {
    text-decoration: underline;
  }

  li {
    max-width: max-content;
  }

  .grid {
    justify-items: start;
  }

  .unknown {
    font-style: italic;
  }

  .thumb {
    clip-path: circle(50% at 50% 50%);
  }
`;

export default function CraftTopic({
  title,
  text,
  hero,
  works,
  masters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { blurDataUrl, src } = hero;
  const wrapperRef = useRef(null);
  useStagger(wrapperRef);
  return (
    <>
      <DefaultMeta pageTitle={title} />
      <Wrapper ref={wrapperRef} data-stagger>
        <Stack>
          <div className="img-container hero">
            <Image
              src={src}
              layout="fill"
              blurDataURL={blurDataUrl}
              alt={title}
              placeholder="blur"
              objectFit="cover"
            />
          </div>
          <Center gutters="var(--s0)">
            <Stack space="var(--s2)" data-stagger>
              <div>
                <div /* className="drop-cap" */>
                  <Markdown
                    options={{
                      overrides: {
                        h1: function H1({ children }) {
                          return (
                            <header>
                              <h1 className="txt-l">{children}</h1>
                            </header>
                          );
                        },
                      },
                    }}
                  >
                    f {/* {text} */}
                  </Markdown>
                </div>
              </div>
              <Stack as="section">
                <h2 className="txt-m">Masters</h2>
                <Grid
                  minimum="125px"
                  space="var(--s1)"
                  as="ul"
                  className="grid"
                  data-stagger
                >
                  {masters.map(({ designer, avatar }) => (
                    <li key={designer}>
                      <div className="img-container">
                        <Image
                          className="thumb"
                          src={avatar.src}
                          objectFit="contain"
                          width={64}
                          height={64}
                          placeholder="blur"
                          blurDataURL={avatar.blurDataUrl}
                          alt={designer}
                        />
                      </div>
                      <Link href={`/archive/${slugify(designer)}`}>
                        <a>{designer}</a>
                      </Link>
                    </li>
                  ))}
                </Grid>
              </Stack>
              <Stack as="section">
                <h2 className="txt-m">Masterpieces</h2>
                <Grid
                  minimum="125px"
                  space="var(--s1)"
                  as="ul"
                  className="grid"
                  data-stagger
                >
                  {works.map(({ name, thumb, designer }) => (
                    <li key={name}>
                      <div className="img-container">
                        <Image
                          src={thumb.src}
                          objectFit="contain"
                          width={64}
                          height={64}
                          placeholder="blur"
                          blurDataURL={thumb.blurDataUrl}
                          alt={name}
                        />
                      </div>
                      <Link href={`/archive/${slugify(designer)}#works`}>
                        <a
                          className={name === 'Unknown Model' ? 'unknown' : ''}
                        >
                          {name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </Grid>
              </Stack>
            </Stack>
          </Center>
        </Stack>
      </Wrapper>
    </>
  );
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const topic = params!.topic as string;
  const base = join(process.cwd(), craftDir, topic);

  const title = upperCaseFirst(topic);
  const hero = await prepareForNextImage(join(base, 'hero.jpg'));
  const text = fs.readFileSync(join(base, 'text.md'), 'utf-8');

  const designersBase = join(process.cwd(), ARCHIVE_PATH);

  // const woodDesigners = glob
  //   .sync(join(mastersBase, '**/product_story.md'))
  //   .filter((_path) =>
  //     (matter(fs.readFileSync(_path, 'utf-8')).data.materials ?? []).includes(
  //       topic
  //     )
  //   )
  //   .map((_path) => {
  //     const splitted = _path.replace(mastersBase, '').split(path.sep);
  //     console.log(splitted);
  //     // const [designerName, , productName, ...rest] = splitted;
  //     // console.log(designerName, productName, productThumb);
  //   });

  const designers = await Promise.all(
    readdir(designersBase)
      .map((designer) => {
        const avatar = join(designersBase, designer, 'avatar.jpg');
        const works = readdir(join(designersBase, designer, 'works'))
          .map((work) => {
            const folder = join(designersBase, designer, 'works', work);
            const { data } = matter(
              fs.readFileSync(join(folder, 'product_story.md'), 'utf-8')
            );
            const thumb = join(folder, 'thumb.png');
            return {
              name: work === 'unknown' ? 'Unknown Model' : work,
              thumb,
              isValid: ((data.materials as string[]) ?? []).includes(topic),
              designer,
            };
          })
          .filter((x) => x.isValid)
          .slice(0, 1);
        return { designer, avatar, works };
      })
      .filter((x) => x.works.length > 0)
      .slice(0, 10)
      .map(async (x) => {
        return {
          ...x,
          works: await Promise.all(
            x.works.map(async (x) => ({
              ...x,
              thumb: await prepareForNextImage(x.thumb),
            }))
          ),
          avatar: await prepareForNextImage(x.avatar),
        };
      })
  );

  return {
    props: {
      masters: designers.map(({ designer, avatar }) => ({ designer, avatar })),
      works: designers.flatMap((x) => x.works),
      title,
      text,
      hero,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const base = join(process.cwd(), craftDir);
  const topics = readdir(base)
    .filter((x) => fs.existsSync(join(base, x, 'text.md')))
    .map((x) => ({
      params: {
        topic: x,
      },
    }));

  return {
    paths: topics,
    fallback: false,
  };
};
