import { useControls } from 'leva';
import DEFAULTS from 'defaults';
import { useSpring, animated } from '@react-spring/three';

interface Props {
  startIntensity: number;
  endIntensity: number;
  config: any;
}

const HemiLight = (props: Props) => {
  const levaProps = useControls(
    'hemisphereLight',
    {
      intensity: { value: props.startIntensity, step: 0.1, min: -1 },
      skyColor: DEFAULTS.sceneBgColor,
      groundColor: DEFAULTS.hemiLightGroundColor,
    },
    { collapsed: true }
  );

  const { intensity } = useSpring({
    from: {
      intensity: props.startIntensity,
    },
    to: {
      intensity: props.endIntensity,
    },
    ...props.config,
  });

  return (
    <animated.hemisphereLight
      args={[levaProps.skyColor, levaProps.groundColor]}
      intensity={intensity}
    />
  );
};

export default HemiLight;
