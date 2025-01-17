import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import trees from "../assets/layers/trees.geojson";

export const addSourceCiampinoTrees = {
  id: "ciampino-trees-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: trees
  }
};

export const colorLayerCiampino = ["#228B22"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const addLayerCiampinoTrees: AddLayerObject = {
  id: "ciampino-trees",
  type: "circle",
  source: addSourceCiampinoTrees.id,
  paint: {
    "circle-color": defaultColorCiampino
  }
};

export const addLayerLegendCiampinoTrees: LayerModel[] = [
  {
    id: "ciampino-trees",
    name: "Ciampino Trees",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayerCiampino
    },
    hasSubClass: false
  }
];
