import defaults from 'defaults';
import { Color, Fog, Scene } from 'three';

interface Props {
  fog?: Fog;
  bgColor?: number;
}

export default function makeScene({ fog, bgColor = defaults.sceneBgColor }: Props) {
  const scene = new Scene();

  scene.background = new Color(bgColor);

  if (fog) {
    scene.fog = fog;
  }

  return scene;
}
