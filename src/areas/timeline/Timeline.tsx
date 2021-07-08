// import { Fragment } from 'react';
import { Fragment, useEffect } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import HistoryToC from 'components/TimelineToC';

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

const slideInAnim = keyframes`
  to {
    transform: translateY(-100%);
  }
`;

const Wrapper = styled.div`
  header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-9xl);
  }

  main {
    display: flex;
    flex-direction: column;
    margin-top: var(--after-navbar-gap);
    margin-bottom: var(--after-navbar-gap);
    gap: calc(8 * var(--flow-gap));
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: var(--flow-gap);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space8);
    padding-left: var(--bleed);
    padding-right: var(--bleed);
    font-size: var(--font-size-9xl);
    line-height: 1.1;
    font-family: 'Avenir Next World', serif;
  }

  h2 {
    max-width: min-content;
  }

  img {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }

  .body p,
  .body blockquote {
    margin-left: auto;
    margin-right: auto;
  }

  /* give the first p some extra room */
  .body > p:first-of-type {
    margin-top: calc(2 * var(--flow-gap));
  }

  /* big quote */
  blockquote > p {
    font-size: 1.5em;
    line-height: 1.25;
  }

  blockquote.prose > p::before,
  blockquote.prose > p::after {
    position: absolute;
    transform: translate(-100%, -15%);
    font-size: 5em;
  }

  blockquote.prose > p::after {
    transform: translateY(-10%);
  }

  /* text effects */
  .outer-wrapper {
    overflow-y: hidden;
    position: relative;
    line-height: 1.1;
  }

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

export default function History({ data }: { data: Timeline }): JSX.Element {
  useEffect(makeObserver, []);
  let prevDate: string | null;

  const tocItems = data.segments.map(({ title, date }) => ({ title, date }));
  return (
    <Wrapper>
      {/* HEADER */}
      <header>
        <h1>History</h1>
      </header>
      <HistoryToC items={tocItems} progress={50} />
      <main>
        {data.segments.map(({ title, date, content }, sectionIndex) => {
          // SECTION
          const prevDateSpan = <span>{prevDate ?? '1900'}</span>;
          prevDate = date;
          return (
            <section key={title + date}>
              {/* HEADER */}
              <div className="header">
                <h2>{title}</h2>
                <p className="date outer-wrapper">
                  <span className="inner-wrapper">
                    {prevDateSpan}
                    <span>{date}</span>
                  </span>
                </p>
              </div>
              {/* BODY */}
              <div className="body">
                {content.map((contentItem, itemIndex) => (
                  <Fragment key={contentItem.content || contentItem.src}>
                    {asComponent(contentItem, sectionIndex, itemIndex)}
                  </Fragment>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </Wrapper>
  );
}

const asComponent = (
  item: GenericContentItem,
  sectionIndex: number,
  itemIndex: number
) => {
  const hasDropCap = sectionIndex === 0 && itemIndex === 1;
  switch (item.tag) {
    case 'blockquote':
      return (
        <blockquote
          className="prose"
          dangerouslySetInnerHTML={{ __html: item.content! }}
        />
      );

    case 'p':
      return (
        <p
          className={`prose ${hasDropCap ? 'drop-cap' : ''}`}
          dangerouslySetInnerHTML={{ __html: item.content! }}
        />
      );
    case 'img':
      return (
        <figure>
          <img src={item.src} alt={item.alt ?? ''} />
          <figcaption>{item.caption}</figcaption>
        </figure>
      );
  }
};
