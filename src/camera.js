import * as THREE from "three";

class Camera extends THREE.PerspectiveCamera {
  constructor() {
    super();
    this.fov = 60;
    this.far = 10000;
    this.position.set(0, 500, 1000);
    this.rotation.set(30, 0, 0);
  }
}

export { Camera };
