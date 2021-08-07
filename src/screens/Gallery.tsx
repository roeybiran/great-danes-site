import styled from 'styled-components/macro';
import Card from 'components/CardProduct';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  grid-auto-rows: 1fr;
  margin-top: var(--after-navbar-gap);
  margin-left: var(--bleed);
  margin-right: var(--bleed);

  > div {
    opacity: 0;
    transform: translateY(10%);
  }
`;

export default function Gallery({ data }: { data: Designer[] }) {
  const allProducts = data.flatMap((designer) => {
    return designer.works.map((product) => {
      return {
        designer: `${designer.firstName} ${designer.lastName}`,
        product,
      };
    });
  });
  return (
    <Grid>
      {allProducts.map(({ product, designer }, idx) => (
        <div
          className="fade-slide"
          key={designer + product.productId}
          style={{ animationDelay: `${0.1 * idx}s` }}
        >
          <Card product={product} designer={designer} />
        </div>
      ))}
    </Grid>
  );
}
