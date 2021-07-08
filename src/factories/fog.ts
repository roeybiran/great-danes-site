import { Fog } from 'three';
import { GUI } from 'dat.gui';
import defaults from 'defaults';

interface Props {
  gui: GUI;
  color: number;
  near?: number;
  far?: number;
}

const makeFog = ({ color, near, far, gui }: Props) => {
  const fog = new Fog(color, near, far);
  const folder = gui.addFolder('fog');
  ['near', 'far'].forEach((k) => {
    folder.add(fog, k).step(0.1).min(0).max(1000);
  });
  return fog;
};

export default makeFog;
