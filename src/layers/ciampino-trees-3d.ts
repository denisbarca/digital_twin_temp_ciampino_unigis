/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddLayerObject } from "maplibre-gl/dist/maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
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
  }
};

export const layerLegend3DTrees: LayerModel[] = [
  {
    id: "ciampino-trees-3d",
    name: "Trees (0 - 20+ meters)",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayer3DTrees
    },
    hasSubClass: false
  }
];
