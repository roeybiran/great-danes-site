import {
  Scene,
  Mesh,
  PlaneGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshPhongMaterial,
  Color,
  MeshLambertMaterial,
} from 'three';

interface Props {
  size?: number;
  color?: number;
}

export default function makeFloor({ size = 1000, color }: Props) {
  const geom = new PlaneGeometry(size, size);
  const mat = new MeshPhongMaterial();
  const mesh = new Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  return mesh;
}
