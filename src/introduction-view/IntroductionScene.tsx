import Camera from '../common-3d/Camera';
import Controls from '../common-3d/Controls';
import Floor from '../common-3d/Floor';
import Fog from '../common-3d/Fog';
import HemisphereLight from '../common-3d/HemisphereLight';
import MainLight from '../common-3d/MainLight';
import CH25 from './ModelCH25';

export default function Scene() {
	return (
		<>
			<Camera position={[0, 1, 2]} makeDefault />
			<Controls
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={0}
				maxDistance={10}
				minDistance={1}
			/>
			<HemisphereLight intensity={0.1} />
			<MainLight
				intensity={1}
				position={[-1, 1, -1]}
				targetPosition={[0, 0, 0]}
			/>
			<CH25 position={[0, 0, -1.5]} />
			<Fog />
			<Floor />
		</>
	);
}
