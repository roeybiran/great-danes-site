import { Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Area, { AreaProps } from 'areas';
import makeDomContent from './dom';
import addModelShadow from 'util/addModelShadow';

type IntroductionAreaProps = AreaProps & {
  models: GLTF[];
  domData: string[];
};

export default class IntroductionArea extends Area {
  models: GLTF[];

  constructor(props: IntroductionAreaProps) {
    super(props);

    const material = new MeshStandardMaterial({ color: 0x000000 });
    const prepared = props.models.map(({ scene }, index) => {
      addModelShadow(scene);
      const mesh = scene.children[0] as Mesh;
      this.group.add(mesh);

      mesh.material = material;
      mesh.position.set(index * 2, 0, 0);
      return scene;
    });

    this.models = props.models;
    this.domContent = makeDomContent(props.domData);
  }
}
