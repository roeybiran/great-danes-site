import { Html } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  color: var(--danish-red);
  animation: 0.8s ease 0s infinite normal both running ${pulse};
  width: 100%;
`;

const Loading = () => {
  return (
    <Html center fullscreen>
      <Wrapper>
        <p className="txt-m sans uppercased">Loading</p>
      </Wrapper>
    </Html>
  );
};

export default Loading;
