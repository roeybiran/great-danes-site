import { useState } from 'react';
import styled, { keyframes } from 'styled-components/macro';

const moveAnim = keyframes`
  to {
    transform: translateX(95%);
  }
`;

const Button = styled.button`
  svg {
    stroke: var(--danish-red);
    stroke-width: 20px;
    fill: none;
  }

  :focus,
  :active {
    outline: none;
  }

  path {
    animation: 2s linear 0s infinite normal forwards running ${moveAnim};
    will-change: trasform;
  }
`;

const linePath = 'M256 128L194.064 128H73.1371H-47.79H-168.717H-227';
const wavePath =
  'M256 78.0191C235.277 78.0191 214.964 94.0156 194.446 128C154.196 194.667 113.946 194.667 73.6959 128C33.4459 61.3333 -6.80405 61.3333 -47.054 128C-87.304 194.667 -127.554 194.667 -167.804 128C-187.536 95.3177 -207.453 78.0191 -227 78.0191';

const audio = new Audio('/sounds/ost.mp3');
audio.addEventListener('timeupdate', () => {
  console.log(audio.currentTime);
});
audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play();
});

const SoundButton = () => {
  const [isMuted, setMuted] = useState(true);
  isMuted ? audio.pause() : audio.play();

  return (
    <Button
      onClick={() => setMuted(!isMuted)}
      aria-label="Toggle Sound"
      title="Toggle Sound"
    >
      <svg width="24" viewBox="0 0 256 256">
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <circle cx="128" cy="128" r="121" fill="#000" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="128" cy="128" r="118" />
          <path d={isMuted ? linePath : wavePath} />
        </g>
      </svg>
    </Button>
  );
};

export default SoundButton;
