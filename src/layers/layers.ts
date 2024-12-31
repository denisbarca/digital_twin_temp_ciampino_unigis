import { LayerModel } from "../lib/models/layer-model";
import { addLayerLegendCiampino } from "./ciampino-boundaries";

const layersLegend: LayerModel[] = [...addLayerLegendCiampino];

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
    console.log("baseLayer", baseLayer.name, basemapName);

    return baseLayer.name === basemapName;
  });
  console.log("currBasemap", currBasemap);

  return currBasemap >= 0 ? colors[currBasemap] : "#000000";
};
