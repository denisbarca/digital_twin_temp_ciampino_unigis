import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import landusePolygons from "../assets/layers/landuse_polygons.geojson";

export const sourceCiampinoLanduse = {
  id: "ciampino-landuse-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: landusePolygons
  }
};

export const colorLayerCiampino = ["#888888"];
export const defaultColorCiampino = colorLayerCiampino[0];
// Define the color mapping based on class_2018 property
export const colorCiampinoLanduseMapping = {
  "Arable land (annual crops)": "#FFFF99", // Light Yellow
  "Discontinuous dense urban fabric (S.L. : 50% -  80%)": "#FF4500", // Orange Red
  "Discontinuous medium density urban fabric (S.L. : 30% - 50%)": "#FF6347", // Tomato
  "Other roads and associated land": "#A9A9A9", // Dark Gray
  Pastures: "#ADFF2F", // Green Yellow
  "Discontinuous low density urban fabric (S.L. : 10% - 30%)": "#FF7F50", // Coral
  "Continuous urban fabric (S.L. : > 80%)": "#8B0000", // Dark Red
  "Industrial, commercial, public, military and private units": "#A52A2A", // Brown
  "Discontinuous very low density urban fabric (S.L. : < 10%)": "#FF8C00", // Dark Orange
  "Land without current use": "#FFFFE0", // Light Yellow
  "Railways and associated land": "#00FFFF", // Black
  "Isolated structures": "#D3D3D3", // Light Gray
  Airports: "#FFA500", // Orange
  "Mineral extraction and dump sites": "#000000", // Black
  "Construction sites": "#FFD700", // Gold
  "Green urban areas": "#32CD32", // Lime Green
  "Sports and leisure facilities": "#800080", // Pale Green
  "Permanent crops (vineyards, fruit trees, olive groves)": "#9ACD32", // Yellow Green
  Forests: "#228B22" // Forest Green
};

export const layerCiampinoLanduse: AddLayerObject = {
  id: "ciampino-landuse",
  type: "fill",
  source: sourceCiampinoLanduse.id,
  paint: {
    "fill-color": [
      "match",
      ["get", "class_2018"],
      "Arable land (annual crops)",
      colorCiampinoLanduseMapping["Arable land (annual crops)"],
      "Discontinuous dense urban fabric (S.L. : 50% -  80%)",
      colorCiampinoLanduseMapping[
        "Discontinuous dense urban fabric (S.L. : 50% -  80%)"
      ],
      "Discontinuous medium density urban fabric (S.L. : 30% - 50%)",
      colorCiampinoLanduseMapping[
        "Discontinuous medium density urban fabric (S.L. : 30% - 50%)"
      ],
      "Other roads and associated land",
      colorCiampinoLanduseMapping["Other roads and associated land"],
      "Pastures",
      colorCiampinoLanduseMapping["Pastures"],
      "Discontinuous low density urban fabric (S.L. : 10% - 30%)",
      colorCiampinoLanduseMapping[
        "Discontinuous low density urban fabric (S.L. : 10% - 30%)"
      ],
      "Continuous urban fabric (S.L. : > 80%)",
      colorCiampinoLanduseMapping["Continuous urban fabric (S.L. : > 80%)"],
      "Industrial, commercial, public, military and private units",
      colorCiampinoLanduseMapping[
        "Industrial, commercial, public, military and private units"
      ],
      "Discontinuous very low density urban fabric (S.L. : < 10%)",
      colorCiampinoLanduseMapping[
        "Discontinuous very low density urban fabric (S.L. : < 10%)"
      ],
      "Land without current use",
      colorCiampinoLanduseMapping["Land without current use"],
      "Railways and associated land",
      colorCiampinoLanduseMapping["Railways and associated land"],
      "Isolated structures",
      colorCiampinoLanduseMapping["Isolated structures"],
      "Airports",
      colorCiampinoLanduseMapping["Airports"],
      "Mineral extraction and dump sites",
      colorCiampinoLanduseMapping["Mineral extraction and dump sites"],
      "Construction sites",
      colorCiampinoLanduseMapping["Construction sites"],
      "Green urban areas",
      colorCiampinoLanduseMapping["Green urban areas"],
      "Sports and leisure facilities",
      colorCiampinoLanduseMapping["Sports and leisure facilities"],
      "Permanent crops (vineyards, fruit trees, olive groves)",
      colorCiampinoLanduseMapping[
        "Permanent crops (vineyards, fruit trees, olive groves)"
      ],
      "Forests",
      colorCiampinoLanduseMapping["Forests"],
      defaultColorCiampino // Default color if no match
    ]
  },
  layout: {
    visibility: "none"
  }
};

export const layerLegendCiampinoLanduse: LayerModel[] = [
  {
    id: "ciampino-landuse",
    name: "Ciampino Landuse",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: Object.values(colorCiampinoLanduseMapping)
    },
    hasSubClass: false,
    onRenderVisible: false
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
