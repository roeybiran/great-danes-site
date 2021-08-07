import * as THREE from 'three';
import React, { useState, useRef } from 'react';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import AnnotationDot from './AnnotationDot';
import AnnotationText from './AnnotationText';

type GLTFResult = GLTF & {
  nodes: {
    rosendahl_kaybojesen_monkey_obj001_1: THREE.Mesh;
    rosendahl_kaybojesen_monkey_obj001_2: THREE.Mesh;
    rosendahl_kaybojesen_monkey_obj001_3: THREE.Mesh;
  };
  materials: {
    ['rosendahl_kaybojesen_monkey_mtl_1.004']: THREE.MeshStandardMaterial;
    ['rosendahl_kaybojesen_monkey_mtl_2.004']: THREE.MeshStandardMaterial;
    ['rosendahl_kaybojesen_monkey_mtl_3.004']: THREE.MeshStandardMaterial;
  };
};

const modelPath = '/models/monkey.glb';

type Props = JSX.IntrinsicElements['group'] & {
  showAnnotations: boolean;
};

export default function Model(props: Props) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  const { showAnnotations } = props;
  const [shownFeature, setShownFeature] = useState<number | null>(null);

  const features = [
    'Kay Bojesen’s Monkey comprises 31 parts and is made of limba wood and sustainable teak.',
    'Every single member of the monkey family is produced in Denmark, and is absolutely unique.',
    'Over time, exposure to the light and the air may change the subtle shades of the teak to a more consistent, warm golden brown tone.',
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
    <group ref={group} {...props} dispose={null} scale={0.04}>
      <group name="Scene">
        <group name="feature1-head" position={[-0.01, 19.86, 1.69]}>
          {showAnnotations && features[0]}
        </group>
        <group name="feature2-belly" position={[-0.06, 7.24, 3.96]}>
          {showAnnotations && features[1]}
        </group>
        <group name="feature3-hand" position={[7.39, 1.52, 7]}>
          {showAnnotations && features[2]}
        </group>
        <group name="rosendahl_kaybojesen_monkey_obj001">
          <mesh
            name="rosendahl_kaybojesen_monkey_obj001_1"
            castShadow
            receiveShadow
            geometry={nodes.rosendahl_kaybojesen_monkey_obj001_1.geometry}
            material={materials['rosendahl_kaybojesen_monkey_mtl_1.004']}
            material-roughness={0}
            material-metalness={0}
          />
          <mesh
            name="rosendahl_kaybojesen_monkey_obj001_2"
            castShadow
            receiveShadow
            geometry={nodes.rosendahl_kaybojesen_monkey_obj001_2.geometry}
            material={materials['rosendahl_kaybojesen_monkey_mtl_2.004']}
            material-roughness={0}
            material-metalness={0}
          />
          <mesh
            name="rosendahl_kaybojesen_monkey_obj001_3"
            castShadow
            receiveShadow
            geometry={nodes.rosendahl_kaybojesen_monkey_obj001_3.geometry}
            material={materials['rosendahl_kaybojesen_monkey_mtl_3.004']}
            material-roughness={0}
            material-metalness={0}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);
