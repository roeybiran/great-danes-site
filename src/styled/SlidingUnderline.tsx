import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

interface Props {
  color?: string;
  delay?: number;
}

const SlidingUnderline = styled(Link)<Props>`
  --colorProp: ${(props) => props.color ?? 'currentcolor'};
  --delay: ${(props) => props.delay ?? 0.4}s;
  --underline-height: 1px;
  background: linear-gradient(to right, var(--colorProp), var(--colorProp));
  background-size: 0 var(--underline-height);
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size var(--delay);

  :hover,
  :focus {
    background-size: 100% var(--underline-height);
  }
`;

export default SlidingUnderline;
