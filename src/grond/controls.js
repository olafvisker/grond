import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { WORLD_SCALE } from "./settings";

class Controls extends OrbitControls {
  constructor(camera, canvas) {
    super(camera, canvas);
    this.enableKeys = false;
    this.enableDamping = true;
    this.dampingFactor = 0.15;
    this.minDistance = 1 * WORLD_SCALE;
    this.maxDistance = 10000 * WORLD_SCALE;
    this.mouseButtons.LEFT = null;
    this.mouseButtons.RIGHT = THREE.MOUSE.LEFT;
    this.mouseButtons.MIDDLE = THREE.MOUSE.RIGHT;
    this.screenSpacePanning = false;
    this.tick = () => this.update();
  }
}

export { Controls };
