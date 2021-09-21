import { useControls } from 'leva';
import constants from '../constants';

interface Props {
  intensity: number;
}

const HemiLight = (props: Props) => {
  const levaProps = useControls('hemisphereLight', {
    intensity: { value: props.intensity, step: 0.1, min: -1 },
    skyColor: constants.sceneBgColor,
    groundColor: constants.hemiLightGroundColor,
  });

  return (
    <hemisphereLight
      args={[levaProps.skyColor, levaProps.groundColor]}
      intensity={levaProps.intensity}
    />
  );
};

export default HemiLight;
