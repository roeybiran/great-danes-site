import styled from 'styled-components';

const AnnotationText = styled.p.attrs({
  className: 'serif',
})`
  position: relative;
  z-index: -1;
  inset-block-start: 8px;
  inset-inline-start: 8px;
  background-color: var(--bgcolor);
  width: 60ch;
  padding: 1rem;
  line-height: 1.5;
  pointer-events: none;
  transition: opacity 0.3s;
  will-change: opacity;
`;

export default AnnotationText;
