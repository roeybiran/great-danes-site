import styled, { keyframes } from 'styled-components/macro';
import Card from 'components/CardProduct';

const fadeSlideIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  grid-auto-rows: 1fr;
  margin-top: var(--after-navbar-gap);
  margin-left: var(--bleed);
  margin-right: var(--bleed);

  > div {
    opacity: 0;
    transform: translateY(10%);
    animation: 0.8s ease-out 0s 1 normal forwards running ${fadeSlideIn};
  }
`;

export default function Gallery({ data }: { data: Designer[] }) {
  const allProducts = data.flatMap((designer) => {
    return designer.works.map((productProperties) => {
      return {
        designer: `${designer.firstName} ${designer.lastName}`,
        productProperties,
      };
    });
  });
  return (
    <Grid>
      {allProducts.map(({ productProperties, designer }, idx) => (
        <div
          key={productProperties.id}
          style={{ animationDelay: `${0.1 + idx / 10}s` }}
        >
          <Card product={productProperties} designer={designer} />
        </div>
      ))}
    </Grid>
  );
}
