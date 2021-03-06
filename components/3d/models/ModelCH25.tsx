/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const modelPath = '/models/ch25.glb';
useGLTF.preload(modelPath);

type GLTFResult = GLTF & {
  nodes: {
    ch25002_1: THREE.Mesh;
    ch25002_2: THREE.Mesh;
    ch25002_3: THREE.Mesh;
    ch25002_4: THREE.Mesh;
    ch25002_5: THREE.Mesh;
  };
  materials: {
    ['ch25_wicker__cray_.001']: THREE.MeshStandardMaterial;
    ['ch25_wicker_back.001']: THREE.MeshStandardMaterial;
    ['ch25_oak__tnt_.001']: THREE.MeshStandardMaterial;
    ['ch25_wicker__cray___tnt_.001']: THREE.MeshStandardMaterial;
    ['Brushed_Steel_Max.001']: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(modelPath) as GLTFResult;
  return (
    <group
      ref={group}
      {...props}
      scale={0.01}
      dispose={null}
      position-y={-0.02}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ch25002_1.geometry}
          material={materials['ch25_wicker__cray_.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ch25002_2.geometry}
          material={materials['ch25_wicker_back.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ch25002_3.geometry}
          material={materials['ch25_oak__tnt_.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ch25002_4.geometry}
          material={materials['ch25_wicker__cray___tnt_.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ch25002_5.geometry}
          material={materials['Brushed_Steel_Max.001']}
        />
      </group>
    </group>
  );
}
