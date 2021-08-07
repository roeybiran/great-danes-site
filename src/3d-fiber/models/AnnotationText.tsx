import styled from 'styled-components/macro';

const AnnotationText = styled.p`
  position: relative;
  z-index: -1;
  top: 8px;
  left: 8px;
  background-color: var(--background-color);
  font-family: schoolbook, serif;
  width: 60ch;
  padding: 1rem;
  line-height: 1.5;
  pointer-events: none;
  transition: opacity 0.3s;
  will-change: opacity;
`;

export default AnnotationText;
