import { CameraHelper, DirectionalLight, DirectionalLightHelper } from 'three';
import { GUI } from 'dat.gui';
import constants from 'defaults';

interface Props {
  gui: GUI;
  color?: number;
  intensity?: number;
}

export default function makeDirectionalLight({ gui, color, intensity }: Props) {
  const light = new DirectionalLight(color, intensity);
  const lightHelper = new DirectionalLightHelper(light);
  const shadowHelper = new CameraHelper(light.shadow.camera);
  lightHelper.visible = false;
  shadowHelper.visible = false;

  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.normalBias = 0.05;

  light.shadow.camera.near = 0;
  light.shadow.camera.far = 4;
  light.shadow.camera.right = 2;
  light.shadow.camera.top = 2;
  light.shadow.camera.left = -2;
  light.shadow.camera.bottom = -2;

  const folder = gui.addFolder('dirLight');

  folder.add(light, 'intensity').min(0).max(100).step(0.1);

  const updateLight = () => {
    light.target.updateMatrixWorld();
    lightHelper.update();
    light.shadow.camera.updateProjectionMatrix();
    shadowHelper.update();
  };

  const dummyObject = {
    value: light.shadow.camera.right * 2,
  };

  folder
    .add(dummyObject, 'value')
    .min(0)
    .max(100)
    .step(0.1)
    .name(`light-shadow-width`)
    .onChange((v) => {
      light.shadow.camera.left = -v;
      light.shadow.camera.right = v;
      updateLight();
    });

  folder
    .add(dummyObject, 'value')
    .min(0)
    .max(100)
    .step(0.1)
    .name(`light-shadow-height`)
    .onChange((v) => {
      light.shadow.camera.bottom = -v;
      light.shadow.camera.top = v;
      updateLight();
    });

  ['near', 'far'].forEach((prop) => {
    folder
      .add(light.shadow.camera, prop)
      .min(0)
      .max(100)
      .step(0.1)
      .name(`light-shadow-${prop}`)
      .onChange(updateLight)
      .listen();
  });

  ['x', 'y', 'z'].forEach((key) => {
    folder
      .add(light.position, key)
      .min(-100)
      .max(100)
      .step(0.5)
      .name(`position${key.toUpperCase()}`)
      .onChange(updateLight)
      .listen();
  });

  ['x', 'y', 'z'].forEach((key) => {
    folder
      .add(light.target.position, key)
      .min(-100)
      .max(100)
      .step(0.5)
      .name(`targetPos${key.toUpperCase()}`)
      .onChange(updateLight)
      .listen();
  });

  folder.add(lightHelper, 'visible').name('lightHelper');
  folder.add(shadowHelper, 'visible').name('lightShadowHelper');

  updateLight();

  return {
    light,
    lightTarget: light.target,
    lightHelper,
    shadowHelper,
  };
}
