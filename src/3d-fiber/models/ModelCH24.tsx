import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import AnnotationDot from './AnnotationDot';
import AnnotationText from './AnnotationText';

type GLTFResult = GLTF & {
  nodes: {
    ch24001_1: THREE.Mesh;
    ch24001_2: THREE.Mesh;
  };
  materials: {
    ['CH24_seat.001']: THREE.MeshStandardMaterial;
    ['CH24_Beech_Bright_.001']: THREE.MeshStandardMaterial;
  };
};

const modelPath = '/models/ch24.glb';

type Props = JSX.IntrinsicElements['group'] & {
  showAnnotations: boolean;
};

export default function Model(props: Props) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  const { showAnnotations } = props;
  const [shownFeature, setShownFeature] = useState<number | null>(null);

  const features = [
    'To give stability to the steam-bent top and ensure comfortable support, Wegner developed the characteristic Y-shaped back that the Wishbone Chair is named after.',
    'The hand-woven seat alone takes a skilled craftsman about an hour to create, using approximately 120 meters of paper cord.',
    'More than 100 steps are required to manufacture each Wishbone Chair, most of which are carried out by hand.',
  ].map((t, i) => (
    <Html key={t}>
      <AnnotationDot
        onClick={() => {
          setShownFeature(shownFeature === i ? null : i);
        }}
      >
        <AnnotationText
          style={{
            opacity: shownFeature === i ? 1 : 0,
          }}
        >
          {t}
        </AnnotationText>
      </AnnotationDot>
    </Html>
  ));

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        name="feature1-backrest"
        position={[0, 0.76, -0.23]}
        scale={[0.02, 0.02, 0.02]}
      >
        {showAnnotations && features[0]}
      </group>
      <group
        name="feature2-seat"
        position={[-0.19, 0.43, 0.26]}
        scale={[0.02, 0.02, 0.02]}
      >
        {showAnnotations && features[1]}
      </group>
      <group
        name="feature3-leg"
        position={[0.22, 0.28, -0.13]}
        scale={[0.02, 0.02, 0.02]}
      >
        {showAnnotations && features[2]}
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          castShadow={props.castShadow}
          receiveShadow={props.receiveShadow}
          geometry={nodes.ch24001_1.geometry}
          material={materials['CH24_seat.001']}
        />
        <mesh
          castShadow={props.castShadow}
          receiveShadow={props.receiveShadow}
          geometry={nodes.ch24001_2.geometry}
          material={materials['CH24_Beech_Bright_.001']}
        />
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
