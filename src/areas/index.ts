import { DirectionalLight, Group, Mesh, MeshStandardMaterial, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type TransitionInfo = { start: Vector; end: Vector };

export interface AreaProps {
  location: Vector;
  camPositionRelative: TransitionInfo;
  controlsTargetRelative: TransitionInfo;
  lightPosRelative: TransitionInfo;
  lightTargetPosRelative: TransitionInfo;
}

export default class Area {
  location: Vector;
  camPositionRelative: TransitionInfo;
  controlsTargetRelative: TransitionInfo;
  lightPosRelative: TransitionInfo;
  lightTargetPosRelative: TransitionInfo;
  domContent: JSX.Element | null = null;

  group: Group;

  constructor(props: AreaProps) {
    this.location = props.location;
    this.camPositionRelative = props.camPositionRelative;
    this.controlsTargetRelative = props.controlsTargetRelative;
    this.lightPosRelative = props.lightPosRelative;
    this.lightTargetPosRelative = props.lightTargetPosRelative;

    const group = new Group();
    group.position.set(...props.location);
    this.group = group;
  }

  enter = (camera: PerspectiveCamera, light: DirectionalLight, controls: OrbitControls) => {
    const group = this.group;
    group.add(camera, light, light.target);
    camera.position.set(
      this.camPositionRelative.start[0],
      this.camPositionRelative.start[1],
      this.camPositionRelative.start[2]
    );
    light.position.set(...this.lightPosRelative.start);
    light.target.position.set(...this.lightTargetPosRelative.start);

    controls.target.set(
      this.group.position.x + this.controlsTargetRelative.start[0],
      this.group.position.y + this.controlsTargetRelative.start[1],
      this.group.position.z + this.controlsTargetRelative.start[2]
    );
  };
}
