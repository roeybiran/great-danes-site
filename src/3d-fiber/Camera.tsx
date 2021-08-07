import { useControls } from 'leva';
import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import { Object3D } from 'three';

interface Props {
  position: Vector;
  fov: number;
  makeDefault: true;
}

const Camera = ({ position, fov, makeDefault }: Props) => {
  const ref = useRef<Object3D>();

  if (ref.current) {
    ref.current.position.set(...position);
  }

  const props = useControls(
    'camera',
    {
      position,
      fov,
    },
    { collapsed: true }
  );
  return (
    <PerspectiveCamera
      ref={ref}
      position={props.position}
      fov={props.fov}
      makeDefault={makeDefault}
    />
  );
};

export default Camera;
