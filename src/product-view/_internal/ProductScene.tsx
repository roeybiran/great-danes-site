import { Stage } from '@react-three/drei';
import React from 'react';
import Controls from '../../components/controls';

export default function Scene({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Stage intensity={0.1}>
				<Controls
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2}
					minDistance={0.5}
					maxDistance={10}
					target={[0, 0.3, 0]}
					enableZoom={false}
				/>
				{children}
			</Stage>
		</>
	);
}
