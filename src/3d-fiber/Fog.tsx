import { useControls } from 'leva';

interface Props {
  near: number;
  far: number;
  color: string;
}

export default function Fog(props: Props) {
  const levaProps = useControls(
    'fog',
    {
      near: props.near,
      far: props.far,
      color: props.color,
    },
    { collapsed: true }
  );
  return (
    <fog attach="fog" args={[levaProps.color, levaProps.near, levaProps.far]} />
  );
}
