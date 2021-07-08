import { AxesHelper, GridHelper } from 'three';
import { GUI } from 'dat.gui';

interface Props {
  gui: GUI;
}

export default function makeHelpers({ gui }: Props) {
  const axesHelper = new AxesHelper();
  const gridHelper = new GridHelper(100, 100);
  gridHelper.visible = false;

  gui.add(axesHelper, 'visible').name('axesHelper');
  gui.add(gridHelper, 'visible').name('gridHelper');

  gridHelper.position.set(0, 0.1, 0);
  axesHelper.position.set(0, 0.2, 0);

  return { gridHelper, axesHelper };
}
