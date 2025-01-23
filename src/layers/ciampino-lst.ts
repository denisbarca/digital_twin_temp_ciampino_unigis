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
  "#0000FF",
  "#00FFFF",
  "#FFFF00",
  "#FFA500",
  "#FF0000",
  "#8B0000"
];
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
      "#0000FF", // Blue
      1,
      "#0000FF", // Blue
      2,
      "#0000FF", // Blue
      3,
      "#0000FF", // Blue
      4,
      "#0000FF", // Blue
      5,
      "#0000FF", // Blue
      6,
      "#0000FF", // Blue
      7,
      "#0000FF", // Blue
      8,
      "#0000FF", // Blue
      9,
      "#0000FF", // Blue
      10,
      "#00FFFF", // Cyan
      11,
      "#00FFFF", // Cyan
      12,
      "#00FFFF", // Cyan
      13,
      "#00FFFF", // Cyan
      14,
      "#00FFFF", // Cyan
      15,
      "#00FFFF", // Cyan
      16,
      "#00FFFF", // Cyan
      17,
      "#00FFFF", // Cyan
      18,
      "#00FFFF", // Cyan
      19,
      "#00FFFF", // Cyan
      20,
      "#FFFF00", // Yellow
      21,
      "#FFFF00", // Yellow
      22,
      "#FFFF00", // Yellow
      23,
      "#FFFF00", // Yellow
      24,
      "#FFFF00", // Yellow
      25,
      "#FFFF00", // Yellow
      26,
      "#FFFF00", // Yellow
      27,
      "#FFFF00", // Yellow
      28,
      "#FFFF00", // Yellow
      29,
      "#FFFF00", // Yellow
      30,
      "#FFA500", // Orange
      31,
      "#FFA500", // Orange
      32,
      "#FFA500", // Orange
      33,
      "#FFA500", // Orange
      34,
      "#FFA500", // Orange
      35,
      "#FF0000", // Red
      36,
      "#FF0000", // Red
      37,
      "#FF0000", // Red
      38,
      "#FF0000", // Red
      39,
      "#FF0000", // Red
      40,
      "#8B0000", // Darker Red
      41,
      "#8B0000", // Darker Red
      42,
      "#8B0000", // Darker Red
      43,
      "#8B0000", // Darker Red
      44,
      "#8B0000", // Darker Red
      45,
      "#8B0000", // Darker Red
      defaultColorLST
    ],
    "fill-opacity": 0.4
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
