import World, { Scene1 } from '3d-fiber';
import styled from 'styled-components/macro';
import { animated, useSpring, config } from '@react-spring/web';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Overlay = styled(animated.div)`
  z-index: 2;
  pointer-events: none;
  background-color: black;
  height: 100vh;
  width: 100vw;
  position: fixed;
`;

const Home = () => {
  const styles = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: config.slow,
    delay: 1000,
  });

  return (
    <>
      <Overlay style={styles} />
      <CanvasContainer>
        <World>
          <Scene1 />
        </World>
      </CanvasContainer>
      <header className="sr-only">
        <h1>Great Danes</h1>
        <p>a Danish Design Archive</p>
      </header>
    </>
  );
};

export default Home;
