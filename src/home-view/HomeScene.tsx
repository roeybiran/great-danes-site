import Camera from '../components/camera';
import Controls from '../components/controls';
import Floor from '../components/floor';
import Fog from '../components/fog';
import HemiLight from '../components/hemiLight';
import MainLight from '../components/mainLight';
import CH24 from '../product-view/_internal/ModelCH24';
import Text3D from './ModelHomeText';

export default function Scene() {
	return (
		<>
			<Camera position={[0, 0.5, 2]} />
			<Controls
				maxPolarAngle={Math.PI / 2.5}
				minPolarAngle={0}
				maxDistance={10}
				minDistance={1}
				enableZoom={false}
			/>
			<HemiLight intensity={0.1} />
			<MainLight
				intensity={1}
				position={[-1, 1, -1]}
				targetPosition={[0, 0, 0]}
			/>
			<CH24 castShadow receiveShadow showHighlights={false} />
			<Text3D
				rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
				scale={[0.1, 0.5, 0.5]}
			/>
			<Fog />
			<Floor />
		</>
	);
}