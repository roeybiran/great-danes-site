import styled from 'styled-components';

const StyledBlockquote = styled.blockquote`
  quotes: '“' '”';

  p {
    font-size: 1.5em;
  }

  > p::before {
    content: open-quote;
  }

  > p::after {
    content: close-quote;
  }
`;

export default StyledBlockquote;
