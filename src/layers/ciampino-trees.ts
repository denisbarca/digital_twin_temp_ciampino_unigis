import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import trees from "../assets/layers/trees.geojson";

export const sourceCiampinoTrees = {
  id: "ciampino-trees-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: trees
  }
};

export const colorLayerCiampino = ["#228B22"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const layerCiampinoTrees: AddLayerObject = {
  id: "ciampino-trees-2d",
  type: "circle",
  source: sourceCiampinoTrees.id,
  paint: {
    "circle-color": defaultColorCiampino,
    "circle-radius": 2
  },
  layout: {
    visibility: "visible"
  }
};

export const layerLegendCiampinoTrees: LayerModel[] = [
  {
    id: ["ciampino-trees-2d", "ciampino-trees-3d"],
    name: "Trees",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayerCiampino
    },
    hasSubClass: false,
    onRenderVisible: true
  }
];
