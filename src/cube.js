import {
  BoxBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from "three";

import { MathUtils } from "three";

function createCube() {
  const geometry = new BoxBufferGeometry(1, 1, 1);
  const material = createMaterial();
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);
  const radiansPerSecond = MathUtils.degToRad(30);
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };
  return cube;
}

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load("assets/textures/glass.jpg");

  const material = new MeshStandardMaterial();
  material.map = texture;
  
  return material;
}

export { createCube };
