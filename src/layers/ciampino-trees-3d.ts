/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl/dist/maplibre-gl";
import { MAPTILER_API_KEY } from "../lib/utils";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";

export const addSourceTrees3D = {
  id: "openmaptiles-trees",
  args: <SourceSpecification | CanvasSourceSpecification>{
    url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`,
    type: "vector"
  }
};

export const colorLayer3DTrees = ["#228B22"];

export const addLayerTrees3D: AddLayerObject = {
  id: "3d-trees",
  source: "openmaptiles-trees",
  "source-layer": "poi",
  filter: ["==", "class", "tree"],
  type: "fill-extrusion",
  minzoom: 15,

  paint: {
    "fill-extrusion-color": colorLayer3DTrees[0], // Forest green
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      16,
      ["get", "height"]
    ],
    "fill-extrusion-base": 0
  }
};

export const addLayerLegend3DTrees: LayerModel[] = [
  {
    id: "3d-trees",
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
