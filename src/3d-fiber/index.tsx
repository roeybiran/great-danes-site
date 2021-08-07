import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated, config } from '@react-spring/three';
import { OrbitControls } from '@react-three/drei';

import Fog from './Fog';
import Floor from './Floor';
// import Helpers from './Helpers';
import MainLight from './MainLight';
import HemisphereLight from './HemiLight';
import Camera from './Camera';
import DEFAULTS from 'defaults';

import CH24 from './models/ModelCH24';
import Monkey from './models/ModelMonkey';
import HomeText from './models/ModelHomeText';
import CH25 from './models/ModelCH25';

const lightAnimConfig = {
  config: { ...config.molasses },
  delay: 0,
};

const Scene1 = () => {
  const { camera } = useThree();
  camera.position.set(0.5, 0.5, 2);

  return (
    <>
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0.5, 0]}
      />
      <MainLight
        startIntensity={0}
        endIntensity={1}
        startPosition={[3, 0, -3]}
        endPosition={[3, 3, -3]}
        target={[0, 0, 0]}
        config={lightAnimConfig}
      />
      <HemisphereLight
        startIntensity={0}
        endIntensity={0.5}
        config={lightAnimConfig}
      />
      <Floor />
      <HomeText
        scale={[0.01, 0.5, 0.5]}
        rotation={[0, -Math.PI / 2, Math.PI / 2]}
        position-y={0.01}
      />
      <CH24
        showAnnotations={false}
        castShadow
        receiveShadow
        position={[0, -0.01, 0]}
      />
    </>
  );
};

interface Scene2Props {
  showAnnotations: boolean;
  model: string;
}

const Scene2 = (props: Scene2Props) => {
  const { camera } = useThree();
  camera.position.set(0, 0.5, 1.5);
  const modelGroupRef = useRef(null);
  const initialY = -2;

  const { positionY } = useSpring({
    from: {
      positionY: initialY,
    },
    to: {
      positionY: 0.1,
    },
    config: config.molasses,
  });

  useFrame(({ clock }) => {
    if (modelGroupRef.current) {
      // @ts-ignore
      modelGroupRef.current!.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={0.5}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        target={[0, 0.5, 0]}
      />
      <MainLight
        startIntensity={1}
        endIntensity={1}
        startPosition={[3, 3, -3]}
        endPosition={[3, 3, -3]}
        target={[0, 0, 0]}
        config={lightAnimConfig}
      />
      <HemisphereLight
        startIntensity={0.5}
        endIntensity={0.5}
        config={lightAnimConfig}
      />
      <animated.group
        ref={modelGroupRef}
        position-y={positionY}
        position={[0, initialY, 0]}
      >
        {props.model === 'CH24' ? (
          <CH24
            showAnnotations={props.showAnnotations}
            castShadow
            receiveShadow
          />
        ) : (
          <Monkey showAnnotations={props.showAnnotations} />
        )}
      </animated.group>
    </>
  );
};

const IntroductionScene = () => {
  const { camera } = useThree();
  camera.position.set(0, 2.5, 2);

  const chairRef = useRef(null);
  useFrame(({ clock, camera }) => {
    if (chairRef.current) {
      // @ts-ignore
      chairRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <OrbitControls
        autoRotate={false}
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        target={[0, 0.5, 0]}
      />
      <MainLight
        startIntensity={1}
        endIntensity={1}
        startPosition={[3, 3, -3]}
        endPosition={[3, 3, -3]}
        target={[0, 0, 0]}
        config={lightAnimConfig}
      />
      <HemisphereLight
        startIntensity={0.2}
        endIntensity={0.2}
        config={lightAnimConfig}
      />
      <Floor />
      <group ref={chairRef} position={[2, 0, -1]}>
        <CH25 />
      </group>
    </>
  );
};

const World = (props: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows dpr={window.devicePixelRatio} flat>
        <Camera position={[0, 0.5, 2]} fov={50} makeDefault />
        {props.children}
        <Fog
          near={DEFAULTS.fogNear}
          far={DEFAULTS.fogFar}
          color={DEFAULTS.sceneBgColor}
        />
        {/* <Helpers /> */}
      </Canvas>
    </Suspense>
  );
};

export default World;
export { Scene1, Scene2, IntroductionScene };
