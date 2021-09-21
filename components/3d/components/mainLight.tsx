import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';
import { CameraHelper } from 'three';
import constants from '../constants';

interface Props {
  intensity: number;
  position: Vector;
  targetPosition: Vector;
}

export default function MainLight(props: Props) {
  const levaProps = useControls('directionalLight', {
    position: { value: props.position, step: 0.1 },
    targetPosition: { value: props.targetPosition, step: 0.1 },
    intensity: { value: props.intensity, step: 0.1, min: 0 },
    color: constants.mainLightColor,
    normalBias: 0.05,
    shdwCamNear: 0.1,
    shdwCamFar: 40,
    shdwCamWidth: 2,
    shdwCamHeight: 2,
    shdwCamHelper: false,
  });

  const shadowCameraRef = useRef();

  useHelper(shadowCameraRef, levaProps.shdwCamHelper ? CameraHelper : null);

  return (
    <>
      <directionalLight
        position={levaProps.position}
        intensity={levaProps.intensity}
        color={levaProps.color}
        castShadow
        shadow-normalBias={levaProps.normalBias}
        shadow-mapSize-width={constants.shadowMapSize}
        shadow-mapSize-height={constants.shadowMapSize}
        shadow-camera-near={levaProps.shdwCamNear}
        shadow-camera-far={levaProps.shdwCamFar}
        shadow-camera-right={levaProps.shdwCamWidth}
        shadow-camera-left={-levaProps.shdwCamWidth}
        shadow-camera-top={levaProps.shdwCamHeight}
        shadow-camera-bottom={-levaProps.shdwCamHeight}
      />
      <orthographicCamera
        attach="shadow-camrea"
        position={levaProps.position}
        ref={shadowCameraRef}
        near={levaProps.shdwCamNear}
        far={levaProps.shdwCamFar}
        right={levaProps.shdwCamWidth}
        left={-levaProps.shdwCamWidth}
        top={levaProps.shdwCamHeight}
        bottom={-levaProps.shdwCamHeight}
      />
    </>
  );
}
// <group attach="target" position={levaProps.targetPosition} />
