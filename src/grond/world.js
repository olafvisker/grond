import { Camera } from "./camera.js";
import { Controls } from "./controls.js";
import { GeoTerrainChunk } from "./geo_terrain_chunk.js";
import { Grid } from "./grid.js";
import { Loop } from "./loop.js";
import { MapboxProvider } from "./providers.js";
import { Renderer } from "./renderer.js";
import { Resizer } from "./resizer.js";
import { Scene } from "./scene.js";
import { WORLD_SCALE } from "./settings";
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
    this._init(container);
    // const [sx, sy, sz] = pointToTile(-122.1921, 46.1988, 14);
    // const [sx, sy, sz] = pointToTile(131.0350212, -25.3437548, 14);
    // const [sx, sy, sz] = pointToTile(-119.63659568, 37.72970977, 14);
    // const [sx, sy, sz] = pointToTile(138.7283623, 35.3628594, 14);
    const [sx, sy, sz] = pointToTile(-73.2052, -50.3948, 14);
    // const [sx, sy, sz] = pointToTile(174.0233, -39.2629, 14);

    loop.updatables.push(controls);
    scene.add(new Grid());

    this._setup_test_scenario(2, sx, sy, sz, new MapboxProvider());
  }

  _init(container) {
    camera = new Camera();
    scene = new Scene();
    renderer = new Renderer();
    controls = new Controls(camera, renderer.domElement);

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    resizer = new Resizer(container, camera, renderer);

    const { ambientLight, mainLight } = createLights();
    scene.add(ambientLight, mainLight);
  }

  _setup_test_scenario(dim, sx, sy, sz, provider) {
    for (let i = 0, l = dim * dim; i < l; i++) {
      const x = i % dim;
      const y = Math.floor(i / dim);
      const c = new GeoTerrainChunk(sx + x, sy + y, sz, provider);
      const size = (256 - c.mpp) * c.mpp * WORLD_SCALE;
      c.position.x = x * size;
      c.position.z = y * size;
      scene.add(c);
      c.generate();
    }
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
