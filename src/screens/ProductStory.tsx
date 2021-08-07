import World, { Scene2 } from '3d-fiber';
import Header from 'components/Product/Header';
import Info from 'components/Product/Info';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

const TextContainer = styled.div`
  padding-left: var(--bleed);
  padding-right: var(--bleed);

  > div:first-child {
    margin-bottom: calc(2 * var(--flow-gap));
  }
`;

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  > div:first-child {
    flex-grow: 1;
  }

  > div:last-child {
    margin-bottom: var(--flow-gap);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: var(--font-size-4xl);
  gap: var(--flow-gap);
  padding-left: var(--bleed);
  padding-right: var(--bleed);
  text-decoration: underline;

  button {
    outline: none;
  }
`;

interface Props {
  data: Designer[];
}

const ProductStory = ({ data }: Props) => {
  // @ts-ignore
  const { designer: designerId, product: productId } = useParams();

  const designer = data.find((designer) => designer.designerId === designerId);
  const product = designer?.works.find((work) => work.productId === productId);

  const [showAnnotations, setShowAnnotations] = useState(false);

  if (!product || !designer || !product.dimensionsCm) return null;

  return (
    <>
      <CanvasContainer>
        <World>
          <Scene2
            model={product.model ?? 'CH24'}
            showAnnotations={showAnnotations}
          />
        </World>
        <ButtonContainer>
          <p>
            {/* <a href="#product-title">Info</a> */}
            <button
              style={{
                outline: 'none',
                textDecoration: 'underline',
              }}
              onClick={() => {
                document
                  .getElementById('product-title')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Info
            </button>
          </p>
          <button
            onClick={() => {
              setShowAnnotations(!showAnnotations);
            }}
          >
            {showAnnotations ? 'Hide' : 'Show'} Highlights
          </button>
        </ButtonContainer>
      </CanvasContainer>
      <TextContainer>
        <div>
          <Header product={product} />
        </div>
        <Info product={product} designer={designer} />
      </TextContainer>
    </>
  );
};

export default ProductStory;
