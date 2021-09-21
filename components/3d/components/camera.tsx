import { useControls } from 'leva';
import { PerspectiveCamera } from '@react-three/drei';

interface Props {
  position: Vector;
  fov?: number;
  makeDefault?: boolean;
}

const Camera = ({ position, fov, makeDefault }: Props) => {
  const levaProps = useControls('camera', {
    position,
    fov: fov ?? 75,
  });
  return (
    <PerspectiveCamera
      position={levaProps.position}
      fov={levaProps.fov}
      makeDefault={makeDefault ?? true}
    />
  );
};

export default Camera;
