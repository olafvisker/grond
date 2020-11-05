import * as THREE from "three";

class TerrainMesh extends THREE.Mesh {
  constructor() {
    super();
  }

  setMesh(heightmap) {
    let geom = new THREE.PlaneBufferGeometry(
      heightmap.width - 1,
      heightmap.height - 1,
      heightmap.width - 1,
      heightmap.height - 1
    );

    geom.rotateX(-Math.PI / 2);
    for (var i = 0, l = geom.attributes.position.count; i < l; i++) {
      geom.attributes.position.setY(i, heightmap.data[i]);
    }

    this.geometry = geom;
    this.castShadow = false;
    this.receiveShadow = true;
    this.geometry.computeVertexNormals();
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
