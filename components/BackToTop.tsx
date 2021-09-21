import styled from 'styled-components';

const A = styled.a`
  color: var(--danish-red);
  font-size: var(--s1);

  span {
    font-style: italic;
    text-decoration: underline;
  }
`;

export default function BackToTop() {
  return (
    <div className="back-to-top">
      <A href="#top" className="serif">
        ↑<span>Back to Top</span>
      </A>
    </div>
  );
}
