import { Clock } from "three";
import Stats from "stats.js";

const clock = new Clock();
const stats = new Stats();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];

    document.body.appendChild(stats.dom);
  }


  start() {
    this.renderer.setAnimationLoop(() => {
      stats.begin();
      this.tick();
      this.renderer.render(this.scene, this.camera);
      stats.end();
      stats.update();
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { Loop };
