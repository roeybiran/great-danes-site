import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import BigQuote from 'components/Designer/BigQuote';
import Hero from 'components/Designer/Hero';
import Main from 'components/Designer/Main';

const Wrapper = styled.div`
  > .big-quote,
  > .designer-hero {
    padding-top: 0;
    min-height: 100vh;
    top: 0;
  }

  > * {
    position: sticky;
    width: 100%;
  }
`;

interface Props {
  data: Designer[];
}

const DesignerStory = ({ data }: Props) => {
  const STAGGER_DURATION = 1;
  // @ts-ignore
  const { designer: id } = useParams();
  const designer = data.find((d) => d.designerId === id);

  if (!designer) return null;

  return (
    <Wrapper>
      {designer.quote && (
        <BigQuote duration={STAGGER_DURATION} quote={designer.quote} />
      )}
      {designer.heroSrc ? (
        <Hero
          id="hero-container"
          src={designer.heroSrc || designer.avatarSrc}
          alt={designer.firstName + ' ' + designer.lastName}
        />
      ) : (
        <div
          style={{
            marginTop: 'var(--after-navbar-gap)',
            marginLeft: 'var(--bleed)',
            objectFit: 'cover',
            maxHeight: '128px',
            maxWidth: '128px',
            clipPath: 'circle(50% at 50% 50%)',
          }}
        >
          <img src={designer.avatarSrc} alt="" />
        </div>
      )}
      <Main designer={designer} />
    </Wrapper>
  );
};

export default DesignerStory;
