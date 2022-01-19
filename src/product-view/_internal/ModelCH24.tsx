import { useGLTF } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import ModelHighlights from './ModelHighlights';

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

type Props = JSX.IntrinsicElements['group'] & {
	showHighlights: boolean;
};

const highlights: ModelHighlight[] = [
	{
		text: 'To give stability to the steam-bent top and ensure comfortable support, Wegner developed the characteristic Y-shaped back that the Wishbone Chair is named after.',
		position: [0, 0.76, -0.23],
		scale: [0.02, 0.02, 0.02],
	},
	{
		text: 'The hand-woven seat alone takes a skilled craftsman about an hour to create, using approximately 120 meters of paper cord.',
		position: [-0.19, 0.43, 0.26],
		scale: [0.02, 0.02, 0.02],
	},
	{
		text: 'More than 100 steps are required to manufacture each Wishbone Chair, most of which are carried out by hand.',
		position: [0.22, 0.28, -0.13],
		scale: [0.02, 0.02, 0.02],
	},
];

const modelPath = '/cms/archive/Hans Wegner/works/CH24/model.glb';
useGLTF.preload(modelPath);

export default function Model({ showHighlights, ...props }: Props) {
	const group = useRef<THREE.Group>();
	const { nodes, materials } = useGLTF(modelPath) as unknown as GLTFResult;

	return (
		<group ref={group} {...props} dispose={null}>
			<ModelHighlights highlights={highlights} shown={showHighlights} />
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
