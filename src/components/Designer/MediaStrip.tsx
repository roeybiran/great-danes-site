import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--flow-gap);

  > * {
    min-width: 20rem;
    flex: 1 1 20rem;
  }

  img {
    width: 100%;
    height: 75%;
    object-fit: cover;
  }

  figure {
    position: relative;
  }
`;

export default function MediaStrip({ items }: { items: GenericMediaItem[] }) {
  return (
    <Container>
      {items.map((mediaItem) => (
        <figure className="prose">
          <img src={mediaItem.src} key={mediaItem.src} alt={mediaItem.alt} />
          {mediaItem.caption && (
            <figcaption
              dangerouslySetInnerHTML={{ __html: mediaItem.caption }}
            />
          )}
        </figure>
      ))}
    </Container>
  );
}
