import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--flow-gap);
`;

const MediaContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--flow-gap);
  padding-top: var(--flow-gap);
  padding-bottom: var(--flow-gap);

  > * {
    max-height: 50vh;
    /* width: 30%; */
    object-fit: contain;
  }
`;

const BackToTop = styled.div`
  button {
    outline: none;
  }
  margin: calc(3 * var(--flow-gap)) auto;
  font-size: 2rem;
  font-weight: bold;
  color: var(--danish-red);
  text-align: center;
`;

interface Props {
  product: Product;
}

export default function Story({ product }: Props) {
  return (
    <Container>
      {product.story.map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <p key={item} className={`prose ${idx === 0 ? 'drop-cap' : ''}`}>
              {item}
            </p>
          );
        } else {
          return (
            <MediaContainer key={item.map((i) => i.src).join()}>
              {item.map((item) => {
                if (item.type === 'vid') {
                  return (
                    <video
                      key={item.src}
                      src={item.src}
                      autoPlay
                      controls
                      muted
                    />
                  );
                } else {
                  return <img key={item.src} src={item.src} alt="" />;
                }
              }) || null}
            </MediaContainer>
          );
        }
      })}
      <BackToTop>
        <p>
          <button
            onClick={() => {
              document
                .getElementById('product-title')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ↑
          </button>
        </p>
      </BackToTop>
    </Container>
  );
}
