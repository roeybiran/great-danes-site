import ToC from 'components/ToC';
import { createElement, useEffect } from 'react';
import styled, { keyframes } from 'styled-components/macro';

const makeObserver = () => {
  const spans = document.querySelectorAll('.outer-wrapper');
  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        entry.target.classList.add('slide-in');
      });
  };

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 1,
  });
  spans.forEach((e) => observer.observe(e));
  return () => observer.disconnect();
};

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: var(--after-navbar-gap);
  margin-bottom: var(--after-navbar-gap);
  gap: calc(8 * var(--flow-gap));
`;

const SectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space8);
  padding-left: var(--bleed);
  padding-right: var(--bleed);
  font-size: var(--font-size-9xl);
  line-height: 1.1;

  h2 {
    max-width: min-content;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--flow-gap);

  img {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }

  > p,
  figure {
    margin-left: auto;
    margin-right: auto;
  }

  /* extra room for the paragraph that follows the img */
  > p:first-of-type {
    /* figure + p { */
    margin-top: calc(2 * var(--flow-gap));
  }

  blockquote {
    padding-left: 1rem;
    border-left-width: 8px;
    border-left-color: var(--danish-red);
  }
`;

const slideInAnim = keyframes`
  to {
    transform: translateY(-100%);
  }
`;

const AnimatedText = styled.div`
  /* text effects */
  overflow-y: hidden;
  position: relative;
  line-height: 1.1;

  .inner-wrapper {
    display: inline-block;
    transform: translateY(0);
    display: block;
  }

  .inner-wrapper > span {
    display: block;
  }

  .inner-wrapper > span:nth-child(2) {
    position: absolute;
  }

  .slide-in .inner-wrapper {
    animation: 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s 1 normal forwards running
      ${slideInAnim};
  }
`;

const TocWrapper = styled.nav`
  z-index: 1;
  position: sticky;
  top: 50%;
  max-width: max-content;
  background-color: var(--background-color);
  padding: 1rem;

  a {
    will-change: color;
    transition: color 0.3s;
  }

  .toc-item.active a {
    font-weight: var(--font-weight-md);
    color: var(--danish-red);
  }

  a:hover {
    text-decoration: underline;
  }
`;

const History = ({ data }: { data: Timeline }) => {
  useEffect(makeObserver, []);
  let prevDate: number | null;

  // const tocItems = data.map(({ header, date }) => ({ header, date }));
  /* <HistoryToC items={tocItems} progress={50} /> */

  return (
    <>
      <TocWrapper>
        <ToC
          entries={data.map(({ header, date }) => ({
            content: `<a href="#${header}">${header}, <span>${date}</span></a>`,
            id: header,
          }))}
          baseClass="toc-item"
          activeClass="active"
        />
      </TocWrapper>
      <AnimatedText>
        <header className="sr-only">
          <h1>History</h1>
        </header>
        <Main>
          {data.map(({ header, date, media, text }, sectionIdx) => {
            const prevDateSpan = <span>{prevDate ?? '1900'}</span>;
            prevDate = date;

            return (
              <section key={header + date}>
                <SectionHeader>
                  <h2 id={header}>{header}</h2>
                  <AnimatedText className="outer-wrapper date">
                    <span className="inner-wrapper">
                      {prevDateSpan}
                      <span>{date}</span>
                    </span>
                  </AnimatedText>
                </SectionHeader>
                {/* BODY */}
                <Body>
                  <>
                    {media.map((mediaItem, itemIdx) => (
                      <figure key={`${sectionIdx}.${itemIdx}`}>
                        <img src={mediaItem.src} alt={mediaItem.alt ?? ''} />
                        <figcaption>{mediaItem.caption}</figcaption>
                      </figure>
                    ))}
                    {text.map((t, i) => (
                      <ContentItem
                        key={t}
                        idx={i}
                        item={t}
                        sectionIdx={sectionIdx}
                      />
                    ))}
                  </>
                </Body>
              </section>
            );
          })}
        </Main>
      </AnimatedText>
    </>
  );
};

export default History;

interface TextProps {
  item: string;
  idx: number;
  sectionIdx: number;
}

const ContentItem = ({ item, idx, sectionIdx }: TextProps) =>
  createElement(item.startsWith('<blockquote>') ? 'figure' : 'p', {
    key: item,
    dangerouslySetInnerHTML: {
      __html: item,
    },
    className: 'prose' + (sectionIdx + idx === 0 ? ' drop-cap' : ''),
  });
