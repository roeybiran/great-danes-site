import styled from 'styled-components/macro';
import StaggeredText from 'components/StaggeredText';
import { useRef } from 'react';

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    flex-basis: 66%;
  }

  & p::after,
  & p::before {
    content: none;
  }

  figure {
    font-size: var(--font-size-6xl);
    line-height: 1.3;
  }
`;

interface Props {
  duration: number;
  quote: string;
}

const BigQuote = ({ quote, duration }: Props) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  return (
    <Container>
      <figure className="prose">
        <blockquote>
          <p ref={textRef}>
            <StaggeredText duration={duration} text={'“' + quote + '”'} />
          </p>
        </blockquote>
      </figure>
    </Container>
  );
};

export default BigQuote;
