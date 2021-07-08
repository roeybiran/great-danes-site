import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const CursorWrapper = styled.div`
  background-color: var(--danish-red);
  width: 32px;
  height: 32px;
  position: fixed;
  z-index: 1;
  clip-path: circle(50% at 50% 50%);
  transform: translate(-50%, -50%);
  pointer-events: none;

  will-change: top, left;
  transition-property: top, left;

  opacity: 0;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;
  animation-play-state: paused;
  animation-name: ${fadeIn};
`;

export default function Cursor() {
  useEffect(() => {
    const cursorElement = document.getElementById('cursor');
    let didPlayFadeInAnimation = false;
    document.addEventListener('mousemove', (event) => {
      if (!didPlayFadeInAnimation) {
        cursorElement!.style.animationPlayState = 'running';
        didPlayFadeInAnimation = true;
      }
      const { clientX, clientY } = event;
      cursorElement!.style.top = `${clientY}px`;
      cursorElement!.style.left = `${clientX}px`;
    });
  });
  return <CursorWrapper id="cursor" />;
}
