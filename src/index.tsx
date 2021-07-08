import React from 'react';
import ReactDOM from 'react-dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import 'styles';

import NavBar from 'components/NavBar';
import ScrollToTop from 'components/ScrollToTop';
import Cursor from 'components/Cursor';

import makeWorld from 'world';

const loader = new GLTFLoader();

/*
// import Archive from 'screens/Archive';
// import Craft from 'screens/Craft';
// import Gallery from 'screens/Gallery';
// import Home from 'screens/Home';
// import Timeline from 'screens/Timeline';
// component: <Introduction data={data.about} />,
    component: <Timeline data={data.timeline} />,
    component: <Archive data={data.catalog} />,
    component: <Gallery data={data.catalog} />,
    component: <Craft data={data.craft} />
*/
interface MenuItem {
  title: string;
  id: AreaName;
  // component: JSX.Element;
}

const menuItems: MenuItem[] = [
  { title: 'Great Danes', id: 'home' },
  { title: 'Introduction', id: 'introduction' },
  { title: 'History', id: 'timeline' },
  { title: 'Index', id: 'archive' },
  { title: 'Gallery', id: 'gallery' },
  { title: 'Craft', id: 'craft' },
];

(async () => {
  const rawModels = await Promise.all([
    loader.loadAsync('models/ch24.glb'),
    loader.loadAsync('models/text.glb'),
    loader.loadAsync('models/low-poly/3300.glb'),
    loader.loadAsync('models/low-poly/3320.glb'),
    loader.loadAsync('models/low-poly/3321.glb'),
    loader.loadAsync('models/low-poly/ant.glb'),
    loader.loadAsync('models/low-poly/china.glb'),
    loader.loadAsync('models/low-poly/drop.glb'),
    loader.loadAsync('models/low-poly/egg.glb'),
    loader.loadAsync('models/low-poly/grand-prix-2.glb'),
    loader.loadAsync('models/low-poly/grand-prix.glb'),
    loader.loadAsync('models/low-poly/oksen.glb'),
    loader.loadAsync('models/low-poly/oxford-2.glb'),
    loader.loadAsync('models/low-poly/oxford.glb'),
    loader.loadAsync('models/low-poly/pk8.glb'),
    loader.loadAsync('models/low-poly/pk9.glb'),
    loader.loadAsync('models/low-poly/pk11.glb'),
    loader.loadAsync('models/low-poly/pk20.glb'),
    loader.loadAsync('models/low-poly/pk22.glb'),
    loader.loadAsync('models/low-poly/pk24.glb'),
    loader.loadAsync('models/low-poly/pk25.glb'),
    loader.loadAsync('models/low-poly/pk31.glb'),
    loader.loadAsync('models/low-poly/pk33.glb'),
    loader.loadAsync('models/low-poly/pk80.glb'),
    loader.loadAsync('models/low-poly/pk91.glb'),
  ]);

  const canvasContainer = document.getElementById('canvas-container') as HTMLDivElement;

  const world = makeWorld({
    container: canvasContainer,
    models: {
      home: {
        chair: rawModels[0],
        text: rawModels[1],
      },
      introduction: {
        furniture: rawModels.slice(2, -1),
      },
    },
  });

  const Nav = () => {
    return (
      <React.StrictMode>
        {/* <Cursor /> */}
        <ScrollToTop />
        <NavBar
          menuItems={menuItems}
          onClick={(event) => {
            event.preventDefault();
            const target = event.target as HTMLLIElement;
            const newArea = (target.dataset.scene as AreaName) ?? 'home';
            world.showArea(newArea);
          }}
        />
      </React.StrictMode>
    );
  };

  ReactDOM.render(<Nav />, document.getElementById('nav'));
})();
