import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  to {
    transform: translateY(0%);
  }
`;

const OuterWrapper = styled.span`
  overflow-y: hidden;
  position: relative;
  line-height: 1.1;
`;

const InnerWrapper = styled.span<{
  delay: number;
  initialPosition: number;
}>`
  display: inline-block;
  animation-name: ${slideIn};
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-duration: 1s;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-delay: ${(props) => props.delay}s;
  transform: translateY(${(props) => props.initialPosition}%);
`;

export default function withSlideInEffect(
  text: string,
  mode: 'fromTop' | 'fromBottom'
) {
  const offset = mode === 'fromTop' ? -100 : 100;
  return text.split(/( )/).map((token, idx) => {
    const key = `${token}_${idx}`;
    if (token === ' ') {
      return <span key={key}>{token}</span>;
    } else {
      return (
        <OuterWrapper>
          <InnerWrapper key={key} delay={idx / 20} initialPosition={offset}>
            {token}
          </InnerWrapper>
        </OuterWrapper>
      );
    }
  });
}
