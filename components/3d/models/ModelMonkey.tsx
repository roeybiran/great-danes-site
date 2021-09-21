import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import ModelHighlights from '../components/modelHighlights';

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

const modelPath = '/cms/archive/Kay Bojesen/works/Monkey/model.glb';
useGLTF.preload(modelPath);

type Props = JSX.IntrinsicElements['group'] & {
  showHighlights: boolean;
};

const highlights: ModelHighlight[] = [
  {
    text: 'Kay Bojesen’s Monkey comprises 31 parts and is made of limba wood and sustainable teak.',
    scale: [1, 1, 1],
    position: [-0.01, 19.86, 1.69],
  },

  {
    text: 'Every single member of the monkey family is produced in Denmark, and is absolutely unique.',
    scale: [1, 1, 1],
    position: [-0.06, 7.24, 3.96],
  },

  {
    text: 'Over time, exposure to the light and the air may change the subtle shades of the teak to a more consistent, warm golden brown tone.',
    scale: [1, 1, 1],
    position: [7.39, 1.52, 7],
  },
];

export default function Model({ showHighlights, ...props }: Props) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;

  return (
    <group ref={group} {...props} dispose={null} scale={0.04}>
      <ModelHighlights highlights={highlights} shown={showHighlights} />
      <group name="rosendahl_kaybojesen_monkey_obj001">
        <mesh
          name="rosendahl_kaybojesen_monkey_obj001_1"
          castShadow
          receiveShadow
          geometry={nodes.rosendahl_kaybojesen_monkey_obj001_1.geometry}
          material={materials['rosendahl_kaybojesen_monkey_mtl_1.004']}
          // material-roughness={0}
          // material-metalness={0}
        />
        <mesh
          name="rosendahl_kaybojesen_monkey_obj001_2"
          castShadow
          receiveShadow
          geometry={nodes.rosendahl_kaybojesen_monkey_obj001_2.geometry}
          material={materials['rosendahl_kaybojesen_monkey_mtl_2.004']}
          // material-roughness={0}
          // material-metalness={0}
        />
        <mesh
          name="rosendahl_kaybojesen_monkey_obj001_3"
          castShadow
          receiveShadow
          geometry={nodes.rosendahl_kaybojesen_monkey_obj001_3.geometry}
          material={materials['rosendahl_kaybojesen_monkey_mtl_3.004']}
          // material-roughness={0}
          // material-metalness={0}
        />
      </group>
    </group>
  );
}
