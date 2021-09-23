import { Stack } from '@roeybiran/every-layout-styled-components';
import { UNKNOWN_MODEL } from 'lib/constants';
import type fetchDesignerWorks from 'lib/fetchDesignerWorks';
import Image from 'next/image';
import styled from 'styled-components';

const WorkCardWrapper = styled.div`
  .img-container.coming-soon {
    filter: grayscale();
  }

  p {
    margin: 0;
  }

  p.coming-soon {
    color: var(--danish-red);
    font-size: 0.75em;
    letter-spacing: 2px;
    font-weight: 500;
  }

  .title {
    font-weight: 500;
  }

  .unknown,
  .nickname {
    font-style: italic;
  }
`;

interface Props {
  work: Fulfilled<ReturnType<typeof fetchDesignerWorks>>[0];
}

export default function WorkCard({ work }: Props) {
  const { isReady, name, id, thumb, nickname } = work;
  return (
    <WorkCardWrapper>
      <Stack>
        <div className={`img-container${isReady ? '' : ' coming-soon'}`}>
          <Image
            alt={name ?? id}
            src={thumb.src}
            width={72}
            height={72}
            objectFit="contain"
            blurDataURL={thumb.blurDataUrl}
            placeholder="blur"
          />
        </div>
        <div>
          {isReady ? null : (
            <p className="coming-soon uppercased">Coming Soon</p>
          )}
          <p className={name ? 'title uppercased' : 'unknown'}>
            {name ?? UNKNOWN_MODEL}
          </p>
          {nickname && <p className="nickname serif">the {nickname}</p>}
        </div>
      </Stack>
    </WorkCardWrapper>
  );
}
