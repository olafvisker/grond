//https://discoverthreejs.com/book/first-steps/textures-intro/

import { Camera } from "./camera.js";
import { Controls } from "./controls.js";
import { GeoTerrainChunk } from "./geo_terrain_chunk.js";
import { Grid } from "./grid.js";
import { Loop } from "./loop.js";
import { MapboxProvider } from "./providers.js";
import { Renderer } from "./renderer.js";
import { Resizer } from "./resizer.js";
import { Scene } from "./scene.js";
import { Terrain } from "./terrain_mesh.js";
import { createCube } from "./cube.js";
import { createLights } from "./lights.js";
import { pointToTile } from "./utils";

let camera;
let renderer;
let scene;
let loop;
let controls;
let resizer;

class World {
  constructor(container) {
    let scene = null;
    this._init(container);
    // console.log(...pointToTile(-122.1921, 46.1988, 14));
    // console.log(...pointToTile(131.0350212, -25.3437548, 14));

    const [sx, sy, sz] = pointToTile(-122.1921, 46.1988, 14);

    container.addEventListener("keydown", (e) => {
      if (e.key !== "w") return;
      for (let x = -2; x < 4; x++) {
        for (let y = -2; y < 4; y++) {
          const c = new GeoTerrainChunk(sx + x, sy + y, sz, provider);
          c.position.x = x * 256 * c.mpp / c.mpu;
          c.position.z = y * 256 * c.mpp / c.mpu;
          this.scene.add(c);
          c.generate();
        }
      }
    });

    const grid = new Grid();
    const cube = createCube();
    cube.position.y = 2;
    loop.updatables.push(controls);
    // loop.updatables.push(cube);
    this.scene.add(grid);

    const provider = new MapboxProvider();
  }

  _init(container) {
    camera = new Camera();
    this.scene = new Scene();
    renderer = new Renderer();
    controls = new Controls(camera, renderer.domElement);

    loop = new Loop(camera, this.scene, renderer);
    container.append(renderer.domElement);
    resizer = new Resizer(container, camera, renderer);

    const { ambientLight, mainLight } = createLights();
    this.scene.add(ambientLight);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  render() {
    renderer.render(scene, camera);
  }
}

export { World };
