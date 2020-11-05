import * as THREE from "three";

import { WORLD_SCALE } from "./settings";

class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super();
    this.fov = 50;
    this.far = 11000 * WORLD_SCALE;
    this.position.set(0, 4000, 2000).multiplyScalar(WORLD_SCALE);
    this.rotation.set(30, 0, 0);
  }
}

export { Camera };
