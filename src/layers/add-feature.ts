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

export const colorLayerCiampino = ["#228B22"];
export const defaultColorCiampino = colorLayerCiampino[0];

export const layerAddFeature: AddLayerObject = {
  id: "click-layer",
  type: "fill-extrusion",
  source: sourceAddFeature.id,
  paint: {
    "fill-extrusion-color": defaultColorCiampino,
    "fill-extrusion-height": 3,
    "fill-extrusion-base": 0,
    "fill-extrusion-opacity": 0.8
  }
};
