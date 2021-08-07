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
    filter: grayscale();
    :hover {
      filter: none;
    }
  }
`;

export default function General({ designer }: Props) {
  return (
    <Container>
      <IntroParagraphAndDesignsArea>
        <p className="prose">{designer.introductoryParagraph}</p>
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
            {designer.works.map((work) => (
              <Link
                key={work.productId}
                to={`/archive/${designer.designerId}/${work.productId}`}
              >
                <figure>
                  <img src={work.thumbSrc} alt="" />
                </figure>
              </Link>
            ))}
          </Designs>
        </div>
      </IntroParagraphAndDesignsArea>
      <SmallDetails designer={designer} />
    </Container>
  );
}
