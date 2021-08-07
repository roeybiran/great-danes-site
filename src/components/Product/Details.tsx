import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import upperCaseFirst from 'util/upperCaseFirst';

const Container = styled.div`
  a {
    text-decoration: underline;
  }
  .heading,
  .manufacturer-info {
    margin-top: var(--space4);
  }

  .heading {
    font-weight: var(--font-weight-md);
  }
`;

interface Props {
  designer: Designer;
  product: Product;
}

export default function Details({ designer, product }: Props) {
  return (
    <Container>
      <p>
        <Link to={`/archive/${designer.designerId}`}>
          {designer.firstName} {designer.lastName}
        </Link>
        , {product.date}
      </p>
      <p className="heading">Composition</p>
      <p>
        {product.materials.map((m, i) => (
          <>
            <Link to="/craft/wood">{upperCaseFirst(m)}</Link>
            {i < product.materials.length - 1 && ', '}
          </>
        ))}
      </p>
      <p className="heading">Categories</p>
      <p>{product.categories.map((c) => upperCaseFirst(c)).join(', ')}</p>
      <p className="heading">Dimensions (cm)</p>
      <p>
        {product.dimensionsCm!.w}w x {product.dimensionsCm!.h}h x{' '}
        {product.dimensionsCm!.d}d
      </p>
      {product.brand && (
        <p className="manufacturer-info">
          Manufactured by{' '}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={product.productURL!}
          >
            {product.brand}
          </a>
        </p>
      )}
    </Container>
  );
}
