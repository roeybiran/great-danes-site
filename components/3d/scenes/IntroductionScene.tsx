import Camera from '../components/camera';
import Controls from '../components/controls';
import Floor from '../components/floor';
import Fog from '../components/fog';
import HemiLight from '../components/hemiLight';
import MainLight from '../components/mainLight';
import CH25 from '../models/ModelCH25';

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
      <HemiLight intensity={0.1} />
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
