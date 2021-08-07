import styled from 'styled-components/macro';

const Wrapper = styled.article`
  display: flex;
  transition: background-color 0.2s ease;
  justify-content: space-between;
  flex-flow: column;
  padding-top: var(--space16);
  padding-bottom: var(--space4);
  gap: var(--space8);

  :hover {
    background-color: var(--product-card-bg-color);
  }

  :hover .details {
    opacity: 1;
  }

  :hover img {
    filter: none;
  }

  .details {
    padding: 0 var(--space4);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .known {
    font-weight: var(--font-weight-md);
  }

  .nickname,
  .unknown {
    font-style: italic;
  }

  img {
    height: 5rem;
    filter: grayscale();
    object-fit: scale-down;
  }
`;

interface Props {
  product: Product;
  designer: string;
}

export default function ProductCard({ product, designer }: Props) {
  return (
    <Wrapper>
      <img
        src={product.thumbSrc}
        alt={`${product.model}, designed by ${designer}`}
      />
      <div className="details">
        <p className={product.model ? 'known' : 'unknown'}>
          {product.model ?? 'Model Unknown'}
        </p>
        {product.nickname && <p className="nickname">the {product.nickname}</p>}
        <p>
          {designer}, {product.date}
        </p>
      </div>
    </Wrapper>
  );
}
