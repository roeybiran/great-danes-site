import { Mesh, Object3D, Texture } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

const deepDispose = (model: any) => {
  if (model.dispose !== null) {
    model.dispose();
  } else if (model instanceof Object3D) {
    model.traverse((child) => {
      if (child instanceof Mesh) {
        child.geometry?.dispose();
        child.material?.dispose();
        Object.values(child.material).forEach((value) => {
          if (value instanceof Texture) {
            value.dispose();
          }
        });
      }
    });
  }
};

export default deepDispose;
