import { metersPerPixel, tile2lat } from "./utils";

import { TerrainMesh } from "./terrain_mesh";

class GeoTerrainChunk extends TerrainMesh {
  constructor(x, y, z, provider) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.provider = provider;
    this.mpp = metersPerPixel(tile2lat(y, z), z);
    this.mpu = 10;
  }

  generate() {
    this.scale.set(this.mpp /  this.mpu, 1 / this.mpu, this.mpp /  this.mpu);
    this.provider.provideHeightmap(this.x, this.y, this.z, (h) =>
      this.setMesh(h)
    );
    this.provider.provideTexture(this.x, this.y, this.z, (t) =>
      this.setMaterial(t)
    );
  }
}

export { GeoTerrainChunk };
