import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import landusePolygons from "../assets/layers/landuse_polygons.geojson";

export const addSourceCiampinoLanduse = {
  id: "ciampino-landuse-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: landusePolygons
  }
};

export const colorLayerCiampino = ["#888888"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const addLayerCiampinoLanduse: AddLayerObject = {
  id: "ciampino-landuse",
  type: "fill",
  source: addSourceCiampinoLanduse.id,
  paint: {
    "fill-color": defaultColorCiampino,
    "fill-opacity": 0.4
  }
};

export const addLayerLegendCiampinoLanduse: LayerModel[] = [
  {
    id: "ciampino-landuse",
    name: "Ciampino Landuse",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayerCiampino
    }
  }
];
