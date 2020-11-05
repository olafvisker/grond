import * as THREE from "three";

class Scene extends THREE.Scene {
  constructor() {
    super();
    this.background = new THREE.Color("black");
  }
}

export { Scene };
