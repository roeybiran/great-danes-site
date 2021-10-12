import Base from '@/components/3d/scenes';
import DefaultMeta from '@/components/defaultMeta';
import styled from 'styled-components';
import HomeScene from '../components/3d/scenes/HomeScene';

const CanvasContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function Home() {
  return (
    <>
      {/* TODO: find a better solution, like per page layouts? */}
      <style jsx global>
        {`
          div[class^='_app'] {
            margin-block-end: 0 !important;
          }
        `}
      </style>
      <DefaultMeta pageTitle={'Home'} />
      <header className="sr-only">
        <h1 className="txt-l">Great Danes</h1>
        <p>a Danish Design Archive</p>
      </header>
      <CanvasContainer>
        <Base>
          <HomeScene />
        </Base>
      </CanvasContainer>
    </>
  );
}
