import styled from 'styled-components/macro';

const Header = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: var(--font-size-9xl);

  p {
    font-weight: initial;
    font-size: var(--font-size-6xl);
  }
`;

interface Props {
  id: string;
  first: string;
  last: string;
  birth: number;
  death: number | null;
}

export default function MainHeader({ id, first, last, birth, death }: Props) {
  return (
    <Header id={id}>
      <h1>
        {first} {last}
      </h1>
      <p>
        {birth}–{death}
      </p>
    </Header>
  );
}
