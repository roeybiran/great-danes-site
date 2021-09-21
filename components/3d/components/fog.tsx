import { useControls } from 'leva';
import constants from '../constants';

interface Props {
  near?: number;
  far?: number;
  color?: string;
}

export default function Fog(props: Props) {
  const levaProps = useControls('fog', {
    near: props.near ?? constants.fogNear,
    far: props.far ?? constants.fogFar,
    color: props.color ?? constants.floorColor,
  });
  return (
    <fog attach="fog" args={[levaProps.color, levaProps.near, levaProps.far]} />
  );
}
