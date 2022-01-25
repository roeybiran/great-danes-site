import { useControls } from 'leva';
import { DEFAULTS } from '../constants';

interface Props {
	near?: number;
	far?: number;
	color?: string;
}

export default function Fog(props: Props) {
	const levaProps = useControls('fog', {
		near: props.near ?? DEFAULTS.fogNear,
		far: props.far ?? DEFAULTS.fogFar,
		color: props.color ?? DEFAULTS.floorColor,
	});
	return (
		<fog attach="fog" args={[levaProps.color, levaProps.near, levaProps.far]} />
	);
}
