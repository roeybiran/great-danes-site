import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

interface Props {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
}

const makeLoop = ({ camera, scene, renderer }: Props) => {
  const clock = new Clock();

  const updatables: Tick[] = [];

  const tick = () => {
    const delta = clock.getDelta();
    updatables.forEach((t) => t(delta));
  };

  const start = () => {
    renderer.setAnimationLoop(() => {
      tick();
      renderer.render(scene, camera);
    });
  };

  const stop = () => {
    renderer.setAnimationLoop(null);
  };

  return {
    updatables,
    start,
    stop,
    tick,
  };
};

export default makeLoop;
