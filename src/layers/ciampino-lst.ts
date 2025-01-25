import {
  AddLayerObject,
  CanvasSourceSpecification,
  SourceSpecification
} from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { mapLayerHeight, mapLayerWidth } from "./layers-config";
import lstPolygons from "../assets/layers/LST_ciampino_vector_4326.geojson";

// const geojson: FeatureCollection = JSON.parse(lstPolygons);

export const sourceCiampinoLST = {
  id: "ciampino-lst-source",
  args: <SourceSpecification | CanvasSourceSpecification>{
    type: "geojson",
    data: lstPolygons
  }
};

export const colorLayerLST = [
  "000000", // Black
  "040274",
  "0502a3",
  "0502ce",
  "0602ff",
  "307ef3",
  "30c8e2",
  "3be285",
  "86e26f",
  "3ae237",
  "d6e21f",
  "ffd611",
  "ff8b13",
  "ff500d",
  "de0101",
  "a71001",
  "210300"
].map((color) => `#${color}`);
export const defaultColorLST = colorLayerLST[0];

export const layerCiampinoLST: AddLayerObject = {
  id: "ciampino-lst",
  type: "fill",
  source: sourceCiampinoLST.id,
  paint: {
    "fill-color": [
      "match",
      ["get", "DN"],
      0,
      colorLayerLST[1],
      1,
      colorLayerLST[1],
      2,
      colorLayerLST[1],
      3,
      colorLayerLST[1],
      4,
      colorLayerLST[2],
      5,
      colorLayerLST[2],
      6,
      colorLayerLST[2],
      7,
      colorLayerLST[3],
      8,
      colorLayerLST[3],
      9,
      colorLayerLST[3],
      10,
      colorLayerLST[4],
      11,
      colorLayerLST[4],
      12,
      colorLayerLST[4],
      13,
      colorLayerLST[5],
      14,
      colorLayerLST[5],
      15,
      colorLayerLST[5],
      16,
      colorLayerLST[6],
      17,
      colorLayerLST[6],
      18,
      colorLayerLST[6],
      19,
      colorLayerLST[7],
      20,
      colorLayerLST[7],
      21,
      colorLayerLST[7],
      22,
      colorLayerLST[8],
      23,
      colorLayerLST[8],
      24,
      colorLayerLST[8],
      25,
      colorLayerLST[9],
      26,
      colorLayerLST[9],
      27,
      colorLayerLST[9],
      28,
      colorLayerLST[10],
      29,
      colorLayerLST[10],
      30,
      colorLayerLST[10],
      31,
      colorLayerLST[11],
      32,
      colorLayerLST[11],
      33,
      colorLayerLST[11],
      34,
      colorLayerLST[12],
      35,
      colorLayerLST[12],
      36,
      colorLayerLST[12],
      37,
      colorLayerLST[13],
      38,
      colorLayerLST[13],
      39,
      colorLayerLST[13],
      40,
      colorLayerLST[14],
      41,
      colorLayerLST[14],
      42,
      colorLayerLST[14],
      43,
      colorLayerLST[15],
      44,
      colorLayerLST[15],
      45,
      colorLayerLST[16],
      46,
      colorLayerLST[16],
      defaultColorLST
    ],
    "fill-opacity": 0.5
  }
};

export const layerLegendCiampinoLST: LayerModel[] = [
  {
    id: "ciampino-lst",
    name: "Land Surface Temperature (2023-08-24)",
    symbol: {
      type: "line",
      width: mapLayerWidth["line"],
      height: mapLayerHeight["line"],
      color: colorLayerLST
    },
    hasSubClass: false,
    onRenderVisible: true
  }
];

export const colorLSTMapping = {
  "0 - 4°C": "#040274",
  "4 - 7°C": "#0502a3",
  "7 - 10°C": "#0502ce",
  "10 - 13°C": "#0602ff",
  "13 - 16°C": "#307ef3",
  "16 - 19°C": "#30c8e2",
  "19 - 22°C": "#3be285",
  "22 - 25°C": "#86e26f",
  "25 - 28°C": "#3ae237",
  "28 - 31°C": "#d6e21f",
  "31 - 34°C": "#ffd611",
  "34 - 37°C": "#ff8b13",
  "37 - 40°C": "#ff500d",
  "40 - 43°C": "#de0101",
  "43 - 45°C": "#a71001",
  "45°C": "#210300"
};

// export const layerCiampinoLSTHexagons = async (
//   geojsonUrl: string
// ): Promise<FeatureCollection> => {
//   console.log("Fetching GeoJSON from URL:", geojsonUrl);

//   // Fetch the GeoJSON data from the URL
//   const response = await fetch(geojsonUrl);
//   const geojson: FeatureCollection = await response.json();

//   console.log("Fetched GeoJSON:", geojson);

//   const resolution = 8;
//   const h3Hexagons: FeatureCollection = {
//     type: "FeatureCollection",
//     features: []
//   };

//   // Iterate through each feature in the input GeoJSON
//   geojson.features.forEach((feature) => {
//     // Ensure the feature is a Polygon or MultiPolygon
//     if (
//       feature.geometry.type === "Polygon" ||
//       feature.geometry.type === "MultiPolygon"
//     ) {
//       // For Polygon
//       if (feature.geometry.type === "Polygon") {
//         const coordinates = feature.geometry.coordinates[0];

//         // Find H3 indexes that cover the polygon
//         const h3Indexes = h3.polygonToCells(coordinates, resolution);
//         console.log("H3 indexes:", h3Indexes);

//         // Convert H3 indexes to hexagon polygons
//         h3Indexes.forEach((h3Index) => {
//           const hexBoundary = h3.cellToBoundary(h3Index);

//           const hexPolygon: Polygon = {
//             type: "Polygon",
//             coordinates: [hexBoundary.map((coord) => [coord[1], coord[0]])]
//           };

//           h3Hexagons.features.push({
//             type: "Feature",
//             geometry: hexPolygon,
//             properties: {
//               h3Index: h3Index,
//               ...feature.properties // Optional: preserve original feature properties
//             }
//           });
//         });
//       }

//       // For MultiPolygon
//       if (feature.geometry.type === "MultiPolygon") {
//         feature.geometry.coordinates.forEach((polygon) => {
//           const coordinates = polygon[0];

//           // Find H3 indexes that cover the polygon
//           const h3Indexes = h3.polygonToCells(coordinates, resolution);

//           // Convert H3 indexes to hexagon polygons
//           h3Indexes.forEach((h3Index) => {
//             const hexBoundary = h3.cellToBoundary(h3Index);

//             const hexPolygon: Polygon = {
//               type: "Polygon",
//               coordinates: [hexBoundary.map((coord) => [coord[1], coord[0]])]
//             };

//             h3Hexagons.features.push({
//               type: "Feature",
//               geometry: hexPolygon,
//               properties: {
//                 h3Index: h3Index,
//                 ...feature.properties // Optional: preserve original feature properties
//               }
//             });
//           });
//         });
//       }
//     }
//   });

//   return h3Hexagons;
// };

// // Assuming you have the original GeoJSON data
// const originalGeoJSON: FeatureCollection = {
//   type: "FeatureCollection",
//   features: lstPolygons
// };

// // Convert the original GeoJSON to H3 hexagons
// const h3HexagonsGeoJSON = layerCiampinoLSTHexagons(lstPolygons);

// Define the H3 hexagons source and layer
// export const sourceH3Hexagons = await (async () => {
//   const h3HexagonsGeoJSON = await layerCiampinoLSTHexagons(lstPolygons);
//   return {
//     id: "h3-hexagons-source",
//     args: <SourceSpecification | CanvasSourceSpecification>{
//       type: "geojson",
//       data: h3HexagonsGeoJSON
//     }
//   };
// })();

// export const layerH3Hexagons: AddLayerObject = {
//   id: "h3-hexagons-layer",
//   type: "fill",
//   source: sourceH3Hexagons.id,
//   paint: {
//     "fill-color": "#FF0000", // Example color
//     "fill-opacity": 0.6
//   }
// };

// // Example usage with MapLibre
// function addH3HexagonsToMap(map: maplibregl.Map, h3Hexagons: FeatureCollection) {
//   map.addSource('h3-hexagons', {
//     type: 'geojson',
//     data: h3Hexagons
//   });

//   map.addLayer({
//     id: 'h3-hexagon-fill',
//     type: 'fill',
//     source: 'h3-hexagons',
//     paint: {
//       'fill-color': '#0080ff',
//       'fill-opacity': 0.3,
//       'fill-outline-color': '#0080ff'
//     }
//   });
// }
