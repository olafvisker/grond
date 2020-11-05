import { metersPerPixel, tile2lat } from "./utils";

import { TerrainMesh } from "./terrain_mesh";
import { WORLD_SCALE } from "./settings";

class GeoTerrainChunk extends TerrainMesh {
  constructor(x, y, z, provider) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.provider = provider;
    this.mpp = metersPerPixel(tile2lat(y, z), z);
  }

  generate() {
    this.scale.set(this.mpp, 1, this.mpp).multiplyScalar(WORLD_SCALE);
    this.provider.provideHeightmap(this.x, this.y, this.z, (h) =>
      this.setMesh(h)
    );
    this.provider.provideTexture(this.x, this.y, this.z, (t) =>
      this.setMaterial(t)
    );
  }
}

export { GeoTerrainChunk };
