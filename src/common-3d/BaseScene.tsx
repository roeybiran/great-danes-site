import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Helpers from './Helpers';
import Loading from './Loading';

export default function BaseScene({ children }: { children: React.ReactNode }) {
	return (
		<Canvas
			shadows={true}
			onCreated={(state) => {
				state.gl.pixelRatio = window.devicePixelRatio;
			}}
		>
			<Suspense fallback={<Loading />}>{children}</Suspense>
			<Helpers />
		</Canvas>
	);
}
