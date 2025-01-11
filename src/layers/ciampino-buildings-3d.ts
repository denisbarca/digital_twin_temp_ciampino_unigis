/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl/dist/maplibre-gl";
import { MAPTILER_API_KEY } from "../lib/utils";

export class CiampinoBuildings3D {
  // Insert the layer beneath any symbol layer.
  static insertLayerBeneath(map: maplibregl.Map): string | undefined {
    const layers = map?.getStyle().layers;

    let labelLayerId;
    if (layers) {
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      return labelLayerId;
    }
  }
}

export const addSourceBuildings3D = {
  id: "openmaptiles",
  args: <SourceSpecification | CanvasSourceSpecification>{
    url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`,
    type: "vector"
  }
};

export const addLayerBuildings3D: AddLayerObject = {
  id: "3d-buildings",
  source: "openmaptiles",
  "source-layer": "building",
  type: "fill-extrusion",
  minzoom: 15,
  filter: ["!=", ["get", "hide_3d"], true],
  paint: {
    "fill-extrusion-color": [
      "interpolate",
      ["linear"],
      ["get", "render_height"],
      0,
      "lightgray",
      200,
      "royalblue",
      400,
      "lightblue"
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
