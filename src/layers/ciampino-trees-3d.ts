/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddLayerObject } from "maplibre-gl/dist/maplibre-gl";
import { sourceCiampinoTrees } from "./ciampino-trees";

export const colorLayer3DTrees = ["#228B22"];

export const layerTrees3D: AddLayerObject = {
  id: "ciampino-trees-3d",
  source: sourceCiampinoTrees.id,
  type: "fill-extrusion",
  minzoom: 15,
  paint: {
    "fill-extrusion-color": colorLayer3DTrees[0], // Forest green
    "fill-extrusion-height": 3,
    "fill-extrusion-base": 0
  },
  layout: {
    visibility: "none"
  }
};
