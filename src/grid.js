import * as THREE from "three";

class Grid extends THREE.GridHelper {
  constructor() {
    super(1000, 10, "#d4d4d4", "#a6a6a6");
  }
}

export { Grid };
