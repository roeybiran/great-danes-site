import styled from 'styled-components/macro';
import World, { IntroductionScene } from '3d-fiber';
import { Link } from 'react-router-dom';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Wrapper = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: var(--bleed);
  padding-right: var(--bleed);

  main > * + * {
    margin-top: var(--flow-gap);
  }

  .credits {
    text-decoration: underline;
    font-style: italic;
    margin-top: var(--space12);
  }
`;

interface Props {
  data: string[];
}

const Introduction = ({ data }: Props) => (
  <>
    <CanvasContainer>
      <World>
        <IntroductionScene />
      </World>
    </CanvasContainer>
    <header className="sr-only">
      <h1>Introduction</h1>
    </header>
    <Wrapper>
      <main>
        {data.map((paragraph, idx) => (
          <p
            key={paragraph}
            className={`prose ${idx === 0 ? 'drop-cap' : ''}`}
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
        <p className="credits">
          <Link to={'/credits'}>Credits</Link>
        </p>
      </main>
    </Wrapper>
  </>
);

export default Introduction;
