import * as THREE from "three";

class TerrainMesh extends THREE.Mesh {
  constructor() {
    super();
  }

  setMesh(heightmap) {
    const res = 2;
    let geom = new THREE.PlaneBufferGeometry(
      heightmap.width - 1,
      heightmap.height - 1,
      (heightmap.width - 1) / res,
      (heightmap.height - 1) / res
    );

    geom.rotateX(-Math.PI / 2);

    for (let y = 0, ly = heightmap.height / res; y < ly; y++) {
      for (let x = 0, lx = heightmap.width / res; x < lx; x++) {
        geom.attributes.position.setY(
          y * ly + x,
          heightmap.data[y * res][x * res]
        );
      }
    }

    this.geometry = geom;

    this.castShadow = false;
    this.receiveShadow = true;
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();
    this.geometry.computeTangents();
  }

  setMaterial(texture) {
    const material = new THREE.MeshStandardMaterial();
    material.map = texture;
    material.side = THREE.DoubleSide;
    // material.wireframe = true;
    this.material = material;
  }
}

export { TerrainMesh };
