import styled from 'styled-components/macro';

const Container = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: var(--flow-gap);

  h1 {
    font-size: var(--font-size-9xl);
  }

  .nickname {
    font-family: schoolbook, serif;
    font-style: italic;
    font-size: var(--font-size-4xl);
  }
`;

export default function Header(props: { product: Product }) {
  return (
    <Container>
      <h1 id="product-title">{props.product.model}</h1>
      {props.product.nickname && (
        <p className="nickname"> the “{props.product.nickname}”</p>
      )}
    </Container>
  );
}
