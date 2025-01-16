import { LayerModel } from "../lib/models/layer-model";
import { addLayerLegendCiampino } from "./ciampino-boundaries";
import { addLayerLegend3DBuildings } from "./ciampino-buildings-3d";
import { addLayerLegendCiampinoLanduse } from "./ciampino-landuse";
import { addLayerLegendCiampinoTrees } from "./ciampino-trees";

const layersLegend: LayerModel[] = [
  ...addLayerLegendCiampino,
  ...addLayerLegend3DBuildings,
  ...addLayerLegendCiampinoLanduse,
  ...addLayerLegendCiampinoTrees
];

export const getLayerLegend = (id: string): LayerModel | undefined => {
  return layersLegend.find((layer) => layer.id === id);
};

export const getLayersLegend = (): LayerModel[] => {
  return layersLegend;
};

// Export the getLayerColor function
export const getLayerColor = (
  colors: string[],
  basemapName: string
): string => {
  const currBasemap: number = layersLegend.findIndex((baseLayer) => {
    return baseLayer.name === basemapName;
  });
  return currBasemap >= 0 ? colors[currBasemap] : "#000000";
};

export const insertLayerBeneath = (map: maplibregl.Map): string | undefined => {
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
};
