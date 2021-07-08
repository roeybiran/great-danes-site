import gsap from 'gsap';
import { GUI } from 'dat.gui';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene, Color, Fog, HemisphereLight, DirectionalLight, Mesh, PlaneGeometry, MeshPhongMaterial } from 'three';
import data from '_data';
import defaults from 'defaults';

import makeRenderer from './factories/renderer';
import makeLoop from './factories/loop';
import makeResizer from './factories/resizer';
import makeCamera from './factories/camera';
import makeDirectionalLight from './factories/directionalLight';
import makeAmbientLight from './factories/ambientLight';
import makeScene from './factories/scene';
import makeFloor from './factories/floor';
import makeHelpers from './factories/helpers';
import makeControls from './factories/controls';
import makeFog from './factories/fog';

import Area from 'areas';
import HomeArea from './areas/home';
import IntroductionArea from './areas/introduction';

import deepDispose from './util/deepDispose';
import renderToDOM from 'util/renderToDOM';
import makeOpeningTransition from './util/openingTransition';
import toArea from './util/toAreaTransition';
import ArchiveArea from 'areas/archive';

interface Props {
  container: HTMLDivElement;
  models: {
    home: {
      text: GLTF;
      chair: GLTF;
    };
    introduction: {
      furniture: GLTF[];
    };
  };
}

const makeWorld = ({ container, models }: Props) => {
  const gui = new GUI();
  gui.width = 425;

  const renderer = makeRenderer();
  const fog = makeFog({ gui, color: defaults.sceneBgColor });
  const scene = makeScene({ fog });
  const camera = makeCamera({ canvas: renderer.domElement, gui });
  const { controls, controlsAnimation } = makeControls({ canvas: renderer.domElement, camera, gui });
  const resizer = makeResizer({ container, camera, renderer });
  const ambientLight = makeAmbientLight({ gui });
  const { light, lightHelper, lightTarget, shadowHelper } = makeDirectionalLight({ gui });
  const floor = makeFloor({});
  const { axesHelper, gridHelper } = makeHelpers({ gui });
  const loop = makeLoop({ camera, renderer, scene });
  const disposables: Disposable[] = [];

  // AREAS
  const homeArea = new HomeArea({
    location: [0, 0, 0],
    // camPositionRelative: { start: [0, 0.5, 4], end: [1, 0.8, 2] },
    // controlsTargetRelative: { start: [0, 0.5, 0], end: [0, 0.5, 0] },
    // lightPosRelative: { start: [1, 0, -1], end: [1, 2, -1] },
    // lightTargetPosRelative: { start: [0, 0.5, 0], end: [0, 0.5, 0] },
    camPositionRelative: { start: [1, 0.8, 2], end: [1, 0.8, 2] },
    controlsTargetRelative: { start: [0, 0.5, 0], end: [0, 0.5, 0] },
    lightPosRelative: { start: [1, 2, -1], end: [1, 2, -1] },
    lightTargetPosRelative: { start: [0, 0.5, 0], end: [0, 0.5, 0] },
    ch24: models.home.chair,
    text: models.home.text,
  });

  const introductionArea = new IntroductionArea({
    location: [20, 0, 0],
    camPositionRelative: { start: [7, 6, 12], end: [7, 4, 10] },
    controlsTargetRelative: { start: [20, 0.5, 0], end: [20, 0.5, 0] },
    lightPosRelative: { start: [20, 2, 2], end: [20, 2, 2] },
    lightTargetPosRelative: { start: [20, 0, 0], end: [20, 0, 0] },
    domData: data.introduction,
    models: models.introduction.furniture,
  });

  const archiveArea = new ArchiveArea({
    location: [100, 0, 0],
    camPositionRelative: { start: [0, 0, 1], end: [0, 0, 1] },
    controlsTargetRelative: { start: [0, 0.5, 0], end: [0, 0.5, 0] },
    lightPosRelative: { start: [0, 2, 2], end: [0, 2, 2] },
    lightTargetPosRelative: { start: [0, 0, 0], end: [0, 0, 0] },
    domData: [],
  });

  scene.add(
    ambientLight,
    axesHelper,
    floor,
    gridHelper,
    light,
    lightHelper,
    lightTarget,
    shadowHelper,
    homeArea.group,
    introductionArea.group,
    archiveArea.group
  );

  loop.updatables.push(controlsAnimation);

  disposables.push(
    // @ts-ignore
    ambientLight,
    axesHelper,
    controls,
    floor,
    gridHelper,
    light,
    lightHelper,
    lightTarget,
    shadowHelper,
    renderer,
    resizer,
    homeArea,
    introductionArea,
    archiveArea
  );

  loop.start();

  container.append(renderer.domElement);

  let currentAreaName: AreaName | undefined;

  homeArea.enter(camera, light, controls);

  // ambientLight.intensity = 0.1;
  // light.intensity = 1.5;

  const showArea = (areaName: AreaName) => {
    const timeline = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        duration: 3,
      },
    });

    // if (areaName === currentAreaName) return;
    // console.log('switching  to', areaName);

    let area: Area;
    let domContent: JSX.Element;
    switch (areaName) {
      case 'introduction':
        area = introductionArea;
        domContent = introductionArea.domContent!;
        break;
      case 'archive':
        area = archiveArea;
        domContent = archiveArea.domContent!;
        break;
      default:
        area = homeArea;
        domContent = homeArea.domContent!;
        break;
    }

    controls.autoRotate = false;
    timeline
      .to('#overlay', {
        opacity: currentAreaName ? 1 : 0,
        duration: 0.5,
        onComplete: () => {
          area.enter(camera, light, controls);
        },
      })
      .to(
        '#overlay',
        {
          opacity: 0,
          duration: 0.5,
        },
        '<0.6'
      )
      .addLabel('entry', '<-0.1')
      .to(
        camera.position,
        {
          x: area.camPositionRelative.end[0],
          y: area.camPositionRelative.end[1],
          z: area.camPositionRelative.end[2],
          onStart: () => {
            renderToDOM(area.domContent!);
            console.log(camera.position);
          },
        },
        'entry'
      )
      .to(
        light.position,
        {
          x: area.lightPosRelative.end[0],
          y: area.lightPosRelative.end[1],
          z: area.lightPosRelative.end[2],
        },
        'entry'
      )
      .to(
        light.target.position,
        {
          x: area.lightTargetPosRelative.end[0],
          y: area.lightTargetPosRelative.end[1],
          z: area.lightTargetPosRelative.end[2],
        },
        'entry'
      )
      .to(
        light,
        {
          intensity: 1.5,
        },
        'entry'
      )
      .to(
        ambientLight,
        {
          intensity: 0.1,
          onComplete: () => {
            setTimeout(() => {
              // controls.autoRotate = true;
            }, 1);
          },
        },
        'entry'
      );

    currentAreaName = areaName;

    //  = 1.5; //  light.intensity = 1.5;
    // ambientLight.intensity = 0.1; //  ambientLight.intensity = 0.1;
    // );
    // const openingTransition = makeOpeningTransition({ ambientLight, camera, light });
    // let toAreaTransition = toArea({
    //   onFadeOutFinish: () => {
    //     area.enter(camera, light, controls);
    //     renderToDOM(domContent);
    //   },
    //   onFadeInFinish: () => {},
    // });
    // console.log(timeline.getChildren());
  };

  const destroy = () => {
    gui.destroy();
    disposables.forEach((d) => deepDispose(d));
  };

  return { destroy, showArea };
};

export default makeWorld;
