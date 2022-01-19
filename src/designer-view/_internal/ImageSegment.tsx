import { Center } from '@roeybiran/every-layout-styled-components';
import Image from 'next/image';
import styled from 'styled-components';

const Figure = styled.figure`
  position: relative;
  height: 90vh;
  width: 90vw;
`;

export default function ImageSegment({ img }: { img: CustomImage }) {
  return (
    <Center intrinsic max="none">
      <Figure>
        <Image
          className="next-img"
          src={img.src}
          placeholder="blur"
          blurDataURL={img.blurDataUrl}
          layout="fill"
          // width={img.width}
          // height={img.height}
          objectFit="contain"
          alt={img.alt}
        />
      </Figure>
    </Center>
  );
}
