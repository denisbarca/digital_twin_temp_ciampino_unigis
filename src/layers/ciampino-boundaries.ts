import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import ciampinoBoundaries from "../assets/layers/ciampino_boundaries.geojson";

export const sourceCiampino = {
  id: "ciampino-boundaries-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: ciampinoBoundaries
  }
};

export const colorLayerCiampino = ["#FF0000"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const layerCiampino: AddLayerObject = {
  id: "ciampino-boundaries",
  type: "line",
  source: sourceCiampino.id,
  paint: {
    "line-color": defaultColorCiampino,
    "line-width": 2, // 2px width
    "line-opacity": 1
  }
};

export const layerLegendCiampino: LayerModel[] = [
  {
    id: "ciampino-boundaries",
    name: "Ciampino Boundaries",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayerCiampino
    },
    hasSubClass: false
  }
];
