import React from 'react';
import styled from 'styled-components';

interface Props {
  children: string;
}

const OuterWrapper = styled.span.attrs({
  'aria-hidden': true,
})`
  overflow: hidden;
  position: relative;
  display: inline-block;
`;

const InnerWrapper = styled.span`
  display: inline-block;
`;

export default function StaggeredText({ children }: Props) {
  return (
    <p aria-label={children}>
      {children.split(/(\s)/).map((word, idx) => {
        return word === ' ' ? (
          word
        ) : (
          <OuterWrapper key={word + `${idx}`}>
            <InnerWrapper
              className="slide-up"
              dangerouslySetInnerHTML={{ __html: word }}
              style={{
                animationDelay: `${idx / 50}s`,
              }}
            />
          </OuterWrapper>
        );
      })}
    </p>
  );
}
