import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';

import DEFAULTS from 'defaults';
import { CameraHelper } from 'three';
import { animated, useSpring } from '@react-spring/three';

interface Props {
  startIntensity: number;
  endIntensity: number;
  startPosition: Vector;
  endPosition: Vector;
  target: Vector;
  config: any;
}

export default function DirLight(props: Props) {
  const levaProps = useControls(
    'directionalLight',
    {
      pos: { value: props.startPosition, step: 0.1 },
      targetPos: { value: props.target, step: 0.1 },
      intensity: { value: props.startIntensity, step: 0.1, min: 0 },
      color: DEFAULTS.mainLightColor,
      normalBias: 0.05,
      shdwCamNear: 0.1,
      shdwCamFar: 40,
      shdwCamWidth: 2,
      shdwCamHeight: 2,
      shdwCamHelper: false,
    },
    { collapsed: true }
  );

  const shadowCameraRef = useRef();

  useHelper(shadowCameraRef, levaProps.shdwCamHelper ? CameraHelper : null);

  const { position, intensity } = useSpring({
    from: {
      intensity: props.startIntensity,
      position: props.startPosition,
    },
    to: {
      intensity: props.endIntensity,
      position: props.endPosition,
    },
    ...props.config,
  });

  return (
    <animated.directionalLight
      position={position}
      target-position={levaProps.targetPos}
      intensity={intensity}
      color={levaProps.color}
      castShadow
      shadow-normalBias={levaProps.normalBias}
      shadow-mapSize-width={DEFAULTS.shadowMapSize}
      shadow-mapSize-height={DEFAULTS.shadowMapSize}
      shadow-camera-near={levaProps.shdwCamNear}
      shadow-camera-far={levaProps.shdwCamFar}
      shadow-camera-right={levaProps.shdwCamWidth}
      shadow-camera-left={-levaProps.shdwCamWidth}
      shadow-camera-top={levaProps.shdwCamHeight}
      shadow-camera-bottom={-levaProps.shdwCamHeight}
    >
      <animated.orthographicCamera
        attach="shadow-camrea"
        position={levaProps.pos}
        ref={shadowCameraRef}
        near={levaProps.shdwCamNear}
        far={levaProps.shdwCamFar}
        right={levaProps.shdwCamWidth}
        left={-levaProps.shdwCamWidth}
        top={levaProps.shdwCamHeight}
        bottom={-levaProps.shdwCamHeight}
      />
      <animated.group attach="target" position={levaProps.targetPos} />
    </animated.directionalLight>
  );
}
