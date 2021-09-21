import { Center } from '@roeybiran/every-layout-styled-components';
import Markdown from 'markdown-to-jsx';

export default function TextSegment({ text }: { text: string }) {
  return (
    <Center>
      <Markdown key={text} options={{ wrapper: 'p', forceWrapper: true }}>
        {text}
      </Markdown>
    </Center>
  );
}
