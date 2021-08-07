import { useControls } from 'leva';

export default function Helpers() {
  const props = useControls(
    'helpers',
    {
      showAxesHelper: true,
      showGridHelper: false,
    },
    { collapsed: true }
  );
  return (
    <>
      <axesHelper visible={props.showAxesHelper} position={[0, 0.2, 0]} />
      <gridHelper visible={props.showGridHelper} />
    </>
  );
}
