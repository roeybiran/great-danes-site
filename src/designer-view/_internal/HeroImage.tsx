import Image from 'next/image';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  inline-size: 100vw;
  block-size: 100vh;
`;

interface Props {
  img: CustomImage | null;
}

export default function HeroImage({ img }: Props) {
  return img ? (
    <Wrapper>
      <Image
        src={img.src}
        alt={img.alt}
        layout="fill"
        blurDataURL={img.blurDataUrl}
        placeholder="blur"
        objectFit="cover"
      />
    </Wrapper>
  ) : null;
}
