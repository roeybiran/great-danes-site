import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Helpers from '../components/helpers';

export default function BaseScene({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      shadows={true}
      onCreated={(state) => {
        state.gl.pixelRatio = window.devicePixelRatio;
      }}
    >
      <Suspense fallback={null}>{children}</Suspense>
      <Helpers />
    </Canvas>
  );
}
