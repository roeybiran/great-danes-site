import { Stack } from '@roeybiran/every-layout-styled-components';
import type fetchSingleDesigner from 'lib/fetchSingleDesigner';
import React from 'react';
import ImageSegment from './ImageSegment';
import TextSegment from './TextSegment';

interface Props {
  content: NonNullable<
    Fulfilled<ReturnType<typeof fetchSingleDesigner>>
  >['mixedContent'];
}

export default function DesignerStory({ content }: Props) {
  return (
    <Stack className="drop-cap">
      {content.map((segment) =>
        typeof segment === 'string' ? (
          <TextSegment key={segment} text={segment} />
        ) : (
          <ImageSegment key={segment.src} img={segment} />
        )
      )}
    </Stack>
  );
}
