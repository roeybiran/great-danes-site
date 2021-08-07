import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import BigQuote from 'components/Designer/BigQuote';
import Hero from 'components/Designer/Hero';
import Main from 'components/Designer/Main';

const Wrapper = styled.div`
  > *:first-child,
  > *:nth-child(2) {
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
      <BigQuote duration={STAGGER_DURATION} quote={designer.quote ?? ''} />
      <Hero
        id="hero-container"
        src={designer.heroSrc}
        alt={designer.firstName + ' ' + designer.lastName}
      />
      <Main designer={designer} />
    </Wrapper>
  );
};

export default DesignerStory;
