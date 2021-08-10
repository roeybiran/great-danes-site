import styled from 'styled-components/macro';

import MainHeader from './MainHeader';
import General from './General';
import MediaStrip from './MediaStrip';
import TextStrip from './TextStrip';
import ToC from 'components/ToC';

const Container = styled.div`
  background-color: var(--background-color);
  padding-left: var(--bleed);
  padding-right: var(--bleed);

  .header-wrapper {
    margin-bottom: calc(2 * var(--flow-gap));
  }
`;

const BioContainer = styled.main`
  margin-top: calc(8 * var(--flow-gap));
  position: relative;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(4 * var(--flow-gap));
  }

  > section + section {
    margin-top: calc(2 * var(--flow-gap));
  }
`;

const ComingSoon = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-weight: bold;
    color: var(--danish-red);
  }
`;

const BackToTop = styled.div`
  button {
    outline: none;
  }
  margin: calc(3 * var(--flow-gap)) auto;
  font-size: 2rem;
  font-weight: bold;
  color: var(--danish-red);
  text-align: center;
`;

const TocWrapper = styled.nav`
  position: sticky;
  top: 50%;
  max-width: max-content;

  a {
    background-color: var(--background-color);
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

interface Props {
  designer: Designer;
}

export default function Main({ designer }: Props) {
  return (
    <Container>
      <div className="header-wrapper">
        <MainHeader
          id="main-header"
          first={designer.firstName}
          last={designer.lastName}
          birth={designer.birth}
          death={designer.death}
        />
      </div>
      <General designer={designer} />
      {designer.bio.length > 0 && typeof designer.bio[0] !== 'string' ? (
        <BioContainer>
          <TocWrapper>
            <ToC
              entries={designer.bio.map((bioSection) => ({
                // @ts-ignore
                content: `<a href="#${bioSection.header}">${bioSection.header}, <span>${bioSection.date}</span></a>`,
                // @ts-ignore
                id: bioSection.header,
              }))}
              baseClass="toc-item"
              activeClass="active"
            />
          </TocWrapper>

          {designer.bio.map((bioSection, sectionIdx) => (
            // @ts-ignore
            <section key={bioSection.date}>
              {/* @ts-ignore */}
              <TextStrip section={bioSection} sectionIndex={sectionIdx} />
              {/* @ts-ignore */}
              <MediaStrip items={bioSection.media} />
            </section>
          ))}
          <BackToTop>
            <p>
              <button
                onClick={() => {
                  document
                    .getElementById('main-header')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                ↑
              </button>
            </p>
          </BackToTop>
        </BioContainer>
      ) : (
        <div
          style={{
            marginTop: 'var(--space16)',
            marginBottom: 'var(--space16)',
          }}
        >
          {designer.bio.map((s) => (
            // @ts-ignore
            <p
              className="prose"
              style={{ marginTop: 'var(--space4)' }}
              // @ts-ignore
              key={s}
            >
              {s}
            </p>
          ))}
        </div>
      )}
    </Container>
  );
}
