import DefaultMeta from '@/components/defaultMeta';
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

const craftDir = join(CMS_PATH, 'craft');

const Wrapper = styled.div`
  .vid-wrapper {
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

  .vid-wrapper.vid-shown {
    opacity: 1;
  }

  main * {
    transition: color 0.3s ease 0s;
  }

  main.vid-shown {
    h1,
    p:not(.coming-soon),
    a {
      color: white;
    }
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
    margin: 0;
    cursor: not-allowed;
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

  const wrapperRef = useRef(null);
  useStagger(wrapperRef);

  return (
    <>
      <DefaultMeta pageTitle="Craft" />
      <Wrapper ref={wrapperRef} className="sans">
        {data.map(({ video, poster }) => (
          <div
            key={video}
            className={`vid-wrapper ${currentVid === video ? 'vid-shown' : ''}`}
          >
            <video poster={poster} playsInline muted loop autoPlay>
              <source src={video} type="video/mp4" media="(hover: hover)" />
            </video>
          </div>
        ))}
        <Center
          className={currentVid ? 'vid-shown' : ''}
          data-stagger
          as="main"
          gutters="var(--s0)"
          max="none"
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
                      }}
                      onMouseOut={() => {
                        setCurrentVid(null);
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
                      }}
                      onMouseOut={() => {
                        setCurrentVid(null);
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
      poster: getPublicPath(join(craftDir, x, 'poster.jpg')),
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
