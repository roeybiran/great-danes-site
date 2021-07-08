import gsap from 'gsap';
import { PerspectiveCamera, DirectionalLight, Light } from 'three';

interface OpeningSequenceProps {
  camera: PerspectiveCamera;
  light: DirectionalLight;
  ambientLight: Light;
}

const timeline = gsap.timeline({
  defaults: {
    ease: 'power1.inOut',
    duration: 4,
  },
});

const makeOpeningTransition = ({ camera, light, ambientLight }: OpeningSequenceProps) =>
  timeline
    .to(camera.position, {
      z: 2,
    })
    .to(
      light.position,
      {
        y: 2,
      },
      0
    )
    .to(
      light,
      {
        intensity: 1.5,
      },
      0
    )
    .to(
      ambientLight,
      {
        intensity: 0.1,
      },
      0
    );

export default makeOpeningTransition;
