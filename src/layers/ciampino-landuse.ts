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
// Define the color mapping based on class_2018 property
export const colorMapping = {
  "Arable land (annual crops)": "#FF0000", // Red
  "Discontinuous dense urban fabric (S.L. : 50% -  80%)": "#00FF00", // Green
  "Discontinuous medium density urban fabric (S.L. : 30% - 50%)": "#0000FF", // Blue
  "Other roads and associated land": "#FFFF00", // Yellow
  Pastures: "#FF00FF", // Magenta
  "Discontinuous low density urban fabric (S.L. : 10% - 30%)": "#00FFFF", // Cyan
  "Continuous urban fabric (S.L. : > 80%)": "#800000", // Maroon
  "Industrial, commercial, public, military and private units": "#808000", // Olive
  "Discontinuous very low density urban fabric (S.L. : < 10%)": "#800080", // Purple
  "Land without current use": "#008000", // Dark Green
  "Railways and associated land": "#000080", // Navy
  "Isolated structures": "#808080", // Gray
  Airports: "#FFA500", // Orange
  "Mineral extraction and dump sites": "#A52A2A", // Brown
  "Construction sites": "#FFC0CB", // Pink
  "Green urban areas": "#FFD700", // Gold
  "Sports and leisure facilities": "#ADFF2F", // Green Yellow
  "Permanent crops (vineyards, fruit trees, olive groves)": "#4B0082", // Indigo
  Forests: "#8B4513" // Saddle Brown
};

export const addLayerCiampinoLanduse: AddLayerObject = {
  id: "ciampino-landuse",
  type: "fill",
  source: addSourceCiampinoLanduse.id,
  paint: {
    "fill-color": [
      "match",
      ["get", "class_2018"],
      "Arable land (annual crops)",
      colorMapping["Arable land (annual crops)"],
      "Discontinuous dense urban fabric (S.L. : 50% -  80%)",
      colorMapping["Discontinuous dense urban fabric (S.L. : 50% -  80%)"],
      "Discontinuous medium density urban fabric (S.L. : 30% - 50%)",
      colorMapping[
        "Discontinuous medium density urban fabric (S.L. : 30% - 50%)"
      ],
      "Other roads and associated land",
      colorMapping["Other roads and associated land"],
      "Pastures",
      colorMapping["Pastures"],
      "Discontinuous low density urban fabric (S.L. : 10% - 30%)",
      colorMapping["Discontinuous low density urban fabric (S.L. : 10% - 30%)"],
      "Continuous urban fabric (S.L. : > 80%)",
      colorMapping["Continuous urban fabric (S.L. : > 80%)"],
      "Industrial, commercial, public, military and private units",
      colorMapping[
        "Industrial, commercial, public, military and private units"
      ],
      "Discontinuous very low density urban fabric (S.L. : < 10%)",
      colorMapping[
        "Discontinuous very low density urban fabric (S.L. : < 10%)"
      ],
      "Land without current use",
      colorMapping["Land without current use"],
      "Railways and associated land",
      colorMapping["Railways and associated land"],
      "Isolated structures",
      colorMapping["Isolated structures"],
      "Airports",
      colorMapping["Airports"],
      "Mineral extraction and dump sites",
      colorMapping["Mineral extraction and dump sites"],
      "Construction sites",
      colorMapping["Construction sites"],
      "Green urban areas",
      colorMapping["Green urban areas"],
      "Sports and leisure facilities",
      colorMapping["Sports and leisure facilities"],
      "Permanent crops (vineyards, fruit trees, olive groves)",
      colorMapping["Permanent crops (vineyards, fruit trees, olive groves)"],
      "Forests",
      colorMapping["Forests"],
      "#888888" // Default color if no match
    ],
    "fill-opacity": 0.2
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
      color: Object.values(colorMapping)
    }
  }
];

// Unique code_2018 values: [
//   '21000', '11210', '11220',
//   '12220', '23000', '11230',
//   '11100', '12100', '11240',
//   '13400', '12230', '11300',
//   '12400', '13100', '13300',
//   '14100', '14200', '22000',
//   '31000'
// ]
// Unique class_2018 values: [
//   'Arable land (annual crops)',
//   'Discontinuous dense urban fabric (S.L. : 50% -  80%)',
//   'Discontinuous medium density urban fabric (S.L. : 30% - 50%)',
//   'Other roads and associated land',
//   'Pastures',
//   'Discontinuous low density urban fabric (S.L. : 10% - 30%)',
//   'Continuous urban fabric (S.L. : > 80%)',
//   'Industrial, commercial, public, military and private units',
//   'Discontinuous very low density urban fabric (S.L. : < 10%)',
//   'Land without current use',
//   'Railways and associated land',
//   'Isolated structures',
//   'Airports',
//   'Mineral extraction and dump sites',
//   'Construction sites',
//   'Green urban areas',
//   'Sports and leisure facilities',
//   'Permanent crops (vineyards, fruit trees, olive groves)',
//   'Forests'
// ]
