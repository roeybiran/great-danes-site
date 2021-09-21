import React from 'react';
import styled from 'styled-components';

interface Props {
  meta: ({ key: string; value: string[] } | null)[];
}

const Wrapper = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: var(--s1);
`;

export default function Summary({ meta }: Props) {
  return (
    <Wrapper data-stagger>
      {meta.map((obj) =>
        obj ? (
          <div key={obj.key} className="entry">
            <dt>{obj.key}</dt>
            <div>
              {obj.value.map((v) => (
                <dd key={v}>{v}</dd>
              ))}
            </div>
          </div>
        ) : null
      )}
    </Wrapper>
  );
}
