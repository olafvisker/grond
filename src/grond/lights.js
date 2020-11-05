import * as THREE from 'three';

function createLights() {
  // const ambientLight = new AmbientLight("white", 2);
  const ambientLight = new THREE.HemisphereLight("white", "darkslategrey", 3);
  const mainLight = new THREE.DirectionalLight("white", 1);
  const pointLight = new THREE.PointLight(0xff0000, 1, 10000);
  mainLight.position.set(50, 200, 0);
  mainLight.castShadow = true;
  return { ambientLight, mainLight };
}

export { createLights };
