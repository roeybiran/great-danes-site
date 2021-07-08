import { PerspectiveCamera, Vector3 } from 'three';
import { GUI } from 'dat.gui';

interface Props {
  canvas: HTMLCanvasElement;
  gui: GUI;
}

export default function makeCamera({ canvas, gui }: Props) {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new PerspectiveCamera(50, aspect, 0.01, 1000);
  const folder = gui.addFolder('camera');

  ['x', 'y', 'z'].forEach((key) => {
    folder
      .add(camera.position, key)
      .step(0.1)
      .min(-100)
      .max(100)
      .name(`position${key.toUpperCase()}`)
      .listen();
  });

  return camera;
}
