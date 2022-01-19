import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import Helpers from './helpers';
import Loading from './loading';

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
