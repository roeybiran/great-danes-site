import { PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

interface Props {
  camera: PerspectiveCamera;
  canvas: HTMLCanvasElement;
  gui: GUI;
}

export default function makeControls({ camera, canvas, gui }: Props) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enabled = true;
  controls.autoRotateSpeed = 0.5;

  const controlsAnimation: Tick = () => {
    controls.update();
  };

  return {
    controls,
    controlsAnimation,
  };
}
