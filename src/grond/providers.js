import * as THREE from "three";

import getPixels from "get-pixels";
import { mapboxRgb2Height } from "./utils.js";

class Provider {
  constructor(token) {
    this.token = token;
  }
  provideHeightmap(x, y, z, callback) {}
  provideTexture(x, y, z, callback) {}
}

class MapboxProvider extends Provider {
  constructor() {
    super(
      "pk.eyJ1IjoiYWJyYWFvYWx2ZXMiLCJhIjoiY2oxbTRzZXBmMDA1ZjJ3bzI3ODZucTM2dCJ9.AICaNFFp-vS2tD5mEHulmA"
    );
  }

  provideHeightmap(x, y, z, callback) {
    let url = `https://api.mapbox.com/v4/mapbox.terrain-rgb/${z}/${x}/${y}.pngraw?access_token=${this.token}`;
    // let heights = [];
    getPixels(url, (err, pixels) => {
      if (!err) {
        const [width, height] = pixels.shape;
        let heights = Array.from(Array(width), () => new Array(height));
        let min = Number.MAX_VALUE;
        let max = -Number.MAX_VALUE;
        for (let y = 0, hl = height; y < hl; y++) {
          for (let x = 0, xl = width; x < xl; x++) {
            let h = mapboxRgb2Height(
              pixels.get(x, y, 0),
              pixels.get(x, y, 1),
              pixels.get(x, y, 2)
            );
            if (min > h) min = h;
            if (max < h) max = h;
            // heights.push(h);
            heights[y][x] = h;
          }
        }
        callback({
          data: heights,
          min: min,
          max: max,
          width: width,
          height: height,
        });
      } else console.log(err);
    });
  }

  provideTexture(x, y, z, callback) {
    let url = `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}@2x.jpg90?access_token=${this.token}`;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(url, callback);
  }
}

export { MapboxProvider };
