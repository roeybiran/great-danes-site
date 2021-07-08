import { Mesh, Object3D } from 'three';

const addModelShadow = (obj: Object3D) => {
  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

export default addModelShadow;
