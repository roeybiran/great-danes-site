import useStagger from '@/components/useStagger';
import {
  Center,
  Cover,
  Stack,
} from '@roeybiran/every-layout-styled-components';
import fs from 'fs';
import { CMS_PATH } from 'lib/constants';
import getPublicPath from 'lib/util/getPublicPath';
import readdir from 'lib/util/readdir';
import upperCaseFirst from 'lib/util/upperCaseFirst';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { join } from 'path';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DefaultMeta from '@/components/defaultMeta';

const craftDir = join(CMS_PATH, 'craft');

const Wrapper = styled.div`
  .video-container {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: opacity 0.3s ease 0s;
    opacity: 0;
    z-index: -1;
  }

  .video-container.vid-shown {
    opacity: 1;
  }

  &.vid-shown * {
    color: white;
    transition: color 0.3s ease 0s;
  }

  .topic:hover {
    text-decoration: underline;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    max-width: max-content;
    margin: 0;
    cursor: pointer;
    line-height: 1.3;
  }

  .coming-soon {
    font-size: var(--s0);
    font-style: italic;
    color: var(--danish-red);
  }
`;

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentVid, setCurrentVid] = useState<string | null>(null);
  const [vidIsShown, setVidIsShown] = useState(false);

  const wrapperRef = useRef(null);
  useStagger(wrapperRef);

  return (
    <>
      <DefaultMeta pageTitle="Craft" />
      <Wrapper
        ref={wrapperRef}
        className={`sans ${vidIsShown ? 'vid-shown' : ''}`}
      >
        <div className={`video-container ${vidIsShown ? 'vid-shown' : ''}`}>
          <video src={currentVid ?? ''} muted loop autoPlay />
        </div>
        <Cover centered="main" minHeight="calc(100vh - var(--s3))">
          <Center
            data-stagger
            as="main"
            className="links-container"
            gutters="var(--s0)"
          >
            <header>
              <h1 className="txt-l">Craft</h1>
            </header>
            <Stack as="ul" data-stagger>
              {data.map(({ topic, isReady, video }) => (
                <li className="txt-m" key={topic}>
                  {isReady ? (
                    <Link href={`/craft/${topic.toLowerCase()}`}>
                      <a
                        onMouseEnter={() => {
                          setCurrentVid(video);
                          setVidIsShown(true);
                        }}
                        onMouseOut={() => {
                          setVidIsShown(false);
                        }}
                      >
                        {topic}
                      </a>
                    </Link>
                  ) : (
                    <>
                      <p
                        onMouseEnter={() => {
                          setCurrentVid(video);
                          setVidIsShown(true);
                        }}
                        onMouseOut={() => {
                          setVidIsShown(false);
                        }}
                      >
                        {topic}
                      </p>
                      <p className="coming-soon serif">Coming Soon</p>
                    </>
                  )}
                </li>
              ))}
            </Stack>
          </Center>
        </Cover>
      </Wrapper>
    </>
  );
}

export const getStaticProps = async () => {
  const base = join(process.cwd(), craftDir);
  const data = readdir(base)
    .map((x) => ({
      topic: upperCaseFirst(x),
      video: getPublicPath(join(craftDir, x, 'vid.mp4')),
      isReady: fs.existsSync(join(base, x, 'text.md')),
    }))
    // @ts-ignore
    .sort((a, b) => {
      if (a.isReady && !b.isReady) return -1;
    });
  return {
    props: {
      data,
    },
  };
};
