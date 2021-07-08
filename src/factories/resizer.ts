import { PerspectiveCamera, WebGLRenderer } from 'three';

interface Props {
  container: HTMLDivElement;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

const setSize = ({ container, camera, renderer }: Props) => {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

export default function resizer(props: Props) {
  setSize(props);
  window.addEventListener('resize', () => setSize(props));
  return {
    dispose: () => {
      // @ts-ignore
      window.removeEventListener('resize', setSize);
    },
  };
}
