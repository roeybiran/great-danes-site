import styled from 'styled-components/macro';
import Details from './Details';
import Story from './Story';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: calc(2 * var(--flow-gap));
`;

interface Props {
  designer: Designer;
  product: Product;
}

export default function Info({ designer, product }: Props) {
  return (
    <Container>
      <Details designer={designer} product={product} />
      <main>
        <Story product={product} />
      </main>
    </Container>
  );
}
