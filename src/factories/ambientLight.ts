import { AmbientLight, HemisphereLight } from 'three';
import { GUI } from 'dat.gui';
import constants from 'defaults';

interface Props {
  gui: GUI;
  color?: number;
  intensity?: number;
}

export default function makeAmbientLight({ gui, color, intensity = 0.3 }: Props) {
  const light = new AmbientLight(color, intensity);
  // const light = new HemisphereLight(color, intensity);
  const folder = gui.addFolder('ambientLight');
  folder.add(light, 'intensity').min(0).max(10).step(0.1);

  return light;
}
