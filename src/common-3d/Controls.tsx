import { OrbitControls, OrbitControlsProps } from '@react-three/drei';
import { useControls } from 'leva';

// interface Props {
//   autoRotate: boolean;
// }

export default function Controls(props: OrbitControlsProps) {
  const levaProps = useControls('controls', {
    autoRotate: props.autoRotate ?? true,
    autoRotateSpeed: props.autoRotateSpeed ?? 0.5,
    targetPosition: (props.target as [number, number, number]) ?? [0, 0, 0],
    enableZoom: props.enableZoom ?? true,
    enablePan: props.enablePan ?? true,
    enableRotate: props.enableRotate ?? true,
  });

  return (
    // @ts-ignore
    <OrbitControls
      autoRotate={levaProps.autoRotate}
      autoRotateSpeed={levaProps.autoRotateSpeed}
      enableZoom={levaProps.enableZoom}
      enablePan={levaProps.enablePan}
      enableRotate={levaProps.enableRotate}
      target={levaProps.targetPosition}
      {...props}
    />
  );
}
