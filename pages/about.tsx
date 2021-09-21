import ExternalLink from '@/components/ExternalLink';
import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import styled from 'styled-components';
import pkg from '../package.json';
import DefaultMeta from '@/components/defaultMeta';

const Wrapper = styled.div`
  p {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  .deps p {
    font-weight: 500;
  }

  .hit {
    margin-block-start: var(--s2);
  }

  ul {
    list-style: disc inside;
    margin-inline-start: 1em;
  }

  li {
    font-family: monospace;
  }

  a {
    text-decoration: underline;
  }
`;

export default function About() {
  return (
    <>
      <DefaultMeta pageTitle="Gallery" />
      <Wrapper className="sans">
        <Stack>
          <Center gutters="var(--s0)">
            <Stack>
              <h1 className="txt-l">About</h1>
              <Stack as="dl">
                <div>
                  <dt>Design, Development</dt>
                  <dd>
                    <ExternalLink href="https://www.roeybiran.com">
                      Roey Biran
                    </ExternalLink>
                  </dd>
                </div>
                <div>
                  <dt>Direction</dt>
                  <ExternalLink href="https://www.01kg.com">
                    Golan Gafni
                  </ExternalLink>
                </div>
              </Stack>
              <Stack className="deps">
                <p>This project uses these great open source works:</p>
                <ul>
                  {[
                    ...Object.keys(pkg.dependencies),
                    ...Object.keys(pkg.devDependencies),
                  ].map((d) => (
                    <li key={d}>
                      <ExternalLink
                        href={`https://www.npmjs.com/search?q=${encodeURIComponent(
                          d
                        )}`}
                      >
                        {d}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Stack>
          </Center>
        </Stack>
        <Center className="hit" gutters="var(--s0)" andText>
          <p>Department of Visual Communications</p>
          <p>Faculty of Design</p>
          <ExternalLink href="https://www.hit.ac.il/en">
            Holon Institue of Technology
          </ExternalLink>
          <p>2021</p>
        </Center>
      </Wrapper>
    </>
  );
}
