import World, { Scene1 } from '3d-fiber';
import styled from 'styled-components/macro';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Home = () => {
  return (
    <>
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
