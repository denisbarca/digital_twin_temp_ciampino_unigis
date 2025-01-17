/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl/dist/maplibre-gl";
import { MAPTILER_API_KEY } from "../lib/utils";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";

export const sourceBuildings3D = {
  id: "openmaptiles",
  args: <SourceSpecification | CanvasSourceSpecification>{
    url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`,
    type: "vector"
  }
};

export const colorLayer3DBuildings = ["#D3D3D3", "#ADD8E6", "#0000FF"];

export const layerBuildings3D: AddLayerObject = {
  id: "3d-buildings",
  source: "openmaptiles",
  "source-layer": "building",
  type: "fill-extrusion",
  minzoom: 15,
  filter: ["!=", "hide_3d", true],
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["get", "render_height"],
      0,
      // colorLayer3DBuildings[0], // Light gray -> from 0 to 10m
      colorLayer3DBuildings[0], // Light gray -> from 0 to 10m
      10,
      colorLayer3DBuildings[1], // Light blue -> from 10 to 20m
      20,
      colorLayer3DBuildings[2] // Blue -> above 20m
    ],
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      16,
      ["get", "render_height"]
    ],
    "fill-extrusion-base": [
      "case",
      [">=", ["get", "zoom"], 16],
      ["get", "render_min_height"],
      0
    ]
  }
};

export const layerLegend3DBuildings: LayerModel[] = [
  {
    id: "3d-buildings",
    name: "Buildings (0 - 20+ meters)",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayer3DBuildings
    },
    hasSubClass: false
  }
];
