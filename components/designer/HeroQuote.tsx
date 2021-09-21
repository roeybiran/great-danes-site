import { Center, Cover } from '@roeybiran/every-layout-styled-components';
import styled from 'styled-components';
import StaggeredText from '../StaggeredText';

const Blockquote = styled.blockquote`
  p {
    font-size: var(--s2);
  }
`;

export default function HeroQuote({ quote }: { quote?: string }) {
  return quote ? (
    <Center max="none" intrinsic gutters="var(--s0)">
      <Cover centered="blockquote">
        <Blockquote>
          <StaggeredText>{`“${quote}”`}</StaggeredText>
        </Blockquote>
      </Cover>
    </Center>
  ) : null;
}
