import * as THREE from "three";

class Renderer extends THREE.WebGLRenderer {
  constructor() {
    super({ antialias: true });
    this.physicallyCorrectLights = true;
    this.shadowMap.enabled = true;
  }
}

export { Renderer };
