import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl/dist/maplibre-gl";

export const sourceAddFeature = {
  id: "click-points",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: []
    }
  }
};

export const colorLayerCiampino = ["#ff0000"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const layerAddFeature: AddLayerObject = {
  id: "click-layer",
  type: "circle",
  source: sourceAddFeature.id,
  paint: {
    "circle-color": defaultColorCiampino,
    "circle-radius": 6
  }
};
