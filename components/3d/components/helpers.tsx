import { useControls } from 'leva';

export default function Helpers() {
  const props = useControls('helpers', {
    showAxesHelper: process.env.NODE_ENV === 'development',
    showGridHelper: process.env.NODE_ENV === 'development',
  });
  return (
    <>
      <axesHelper visible={props.showAxesHelper} position={[0, 0.2, 0]} />
      <gridHelper visible={props.showGridHelper} />
    </>
  );
}
