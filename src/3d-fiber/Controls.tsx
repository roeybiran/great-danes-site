import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';

interface Props {
  target: Vector;
  autoRotate: boolean;
}

export default function Controls({ autoRotate, target }: Props) {
  const props = useControls(
    'orbitControls',
    {
      target,
      autoRotate,
      enableZoom: true,
      enablePan: true,
      enableRotate: true,
    },
    { collapsed: true }
  );

  return (
    <OrbitControls
      autoRotate={props.autoRotate}
      autoRotateSpeed={0.5}
      enableZoom={props.enableZoom}
      enablePan={props.enablePan}
      enableRotate={props.enableRotate}
      // minPolarAngle={0}
      // maxPolarAngle={0}
      // maxAzimuthAngle={Math.PI / 1.1}
      // minAzimuthAngle={-Math.PI / 6}
    >
      <vector3 args={props.target} attach="target" />
    </OrbitControls>
  );
}
