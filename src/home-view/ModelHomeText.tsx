import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
	nodes: {
		subtitle: THREE.Mesh;
		title: THREE.Mesh;
	};
	materials: {};
};

const modelPath = '/models/text.glb';
useGLTF.preload(modelPath);

export default function Model(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>();
	const { nodes } = useGLTF(modelPath) as unknown as GLTFResult;
	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.subtitle.geometry}
				material={nodes.subtitle.material}
				position={[0, 1.1, 0]}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				material-color={0xff0000}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.title.geometry}
				material={nodes.title.material}
				rotation={[Math.PI / 2, 0, -Math.PI / 2]}
				material-color={0xff0000}
			/>
		</group>
	);
}
