import Image from 'next/image';
import { Reel } from '@roeybiran/every-layout-styled-components';
import styled from 'styled-components';

const Wrapper = styled.div`
  .next-image-container {
    height: 75vh;
    width: 75vh;
  }
  .next-image {
  }
`;

interface Props {
  gallery: CustomImage[];
}

export default function Gallery({ gallery }: Props) {
  return gallery.length > 0 ? (
    <Wrapper>
      <h2 className="txt-m">Gallery</h2>
      <Reel>
        {gallery.map((i) => (
          <div className="next-image-container" key={i.src}>
            <Image
              className="next-image"
              width={640}
              height={640}
              src={i.src}
              alt={i.alt}
              placeholder="blur"
              blurDataURL={i.blurDataUrl}
              objectFit="contain"
            />
          </div>
        ))}
      </Reel>
    </Wrapper>
  ) : null;
}
