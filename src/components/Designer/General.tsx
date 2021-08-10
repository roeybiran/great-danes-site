import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import SmallDetails from './SmallDetails';

const Container = styled.div`
  --gap: calc(4 * var(--flow-gap));

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--gap);

  > * {
    flex: 1 1 19rem;
    min-width: calc(50% - var(--gap));
  }
`;

interface Props {
  designer: Designer;
}

const IntroParagraphAndDesignsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: calc(4 * var(--flow-gap));
`;

const Designs = styled.div`
  display: grid;
  justify-items: center;
  /* gap: calc(2 * var(--flow-gap)); */
  row-gap: calc(2 * var(--flow-gap));
  /* minmax(min(280px, 100%), max-content) */
  grid-template-columns: repeat(auto-fill, 128px);
  align-items: flex-end;
  img {
    height: 72px;
    width: 72px;
    object-fit: contain;

    :hover {
      filter: none;
    }
  }

  .product-no-info img {
    filter: grayscale();
  }

  .product-no-info p {
    margin-top: 1rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .product-no-info img:hover + p {
    opacity: 1;
  }
`;

export default function General({ designer }: Props) {
  return (
    <Container>
      <IntroParagraphAndDesignsArea>
        {designer.introductoryParagraph && (
          <p className="prose">{designer.introductoryParagraph}</p>
        )}
        <div>
          <p
            style={{
              fontSize: 'var(--font-size-5xl)',
              marginBottom: 'var(--flow-gap)',
            }}
          >
            Designs
          </p>
          <Designs>
            {designer.works.map((work) => {
              if (work.story.length === 0) {
                return (
                  <figure
                    style={{
                      position: 'relative',
                    }}
                    className="product-no-info"
                  >
                    <img src={work.thumbSrc} alt="" />
                    <p
                      style={{
                        pointerEvents: 'none',
                        padding: '0.5rem',

                        position: 'absolute',
                        fontSize: '1rem',
                        backgroundColor: 'var(--danish-red)',
                        color: 'white',
                        zIndex: 1,
                      }}
                    >
                      More information coming soon.
                    </p>
                  </figure>
                );
              }
              return (
                <Link
                  key={work.productId}
                  to={`/archive/${designer.designerId}/${work.productId}`}
                >
                  <figure>
                    <img src={work.thumbSrc} alt="" />
                  </figure>
                </Link>
              );
            })}
          </Designs>
        </div>
      </IntroParagraphAndDesignsArea>
      <SmallDetails designer={designer} />
    </Container>
  );
}
