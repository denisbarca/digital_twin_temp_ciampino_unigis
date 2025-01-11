import { LayerModel } from "../lib/models/layer-model";
import { addLayerLegendCiampino } from "./ciampino-boundaries";
import { addLayerLegend3DBuildings } from "./ciampino-buildings-3d";

const layersLegend: LayerModel[] = [
  ...addLayerLegendCiampino,
  ...addLayerLegend3DBuildings
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
