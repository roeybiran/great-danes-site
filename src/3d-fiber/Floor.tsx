import DEFAULTS from 'defaults';
import { useControls } from 'leva';

const Floor = (props: JSX.IntrinsicElements['mesh']) => {
  const levaProps = useControls(
    'floor',
    {
      color: DEFAULTS.floorColor,
    },
    { collapsed: true }
  );
  return (
    <mesh {...props} rotation={[-Math.PI / 2, 0, 0]} scale={1} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial
        attach="material"
        color={levaProps.color}
        depthWrite={false}
      />
    </mesh>
  );
};

export default Floor;
