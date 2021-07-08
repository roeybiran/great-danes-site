import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Area, { AreaProps } from 'areas';
import addModelShadow from 'util/addModelShadow';
import makeDomContent from './dom';

type HomeAreaProps = AreaProps & {
  ch24: GLTF;
  text: GLTF;
};

export default class HomeArea extends Area {
  constructor(props: HomeAreaProps) {
    super(props);

    const { ch24, text } = props;

    [ch24, text].forEach(({ scene }) => addModelShadow(scene));
    ch24.scene.scale.set(0.01, 0.01, 0.01);
    text.scene.position.set(0, 0.25, -1);
    text.scene.scale.set(0.5, 0.5, 0.5);
    text.scene.rotateY(-Math.PI / 2);

    this.group.add(text.scene, ch24.scene);

    this.domContent = makeDomContent();
  }
}
