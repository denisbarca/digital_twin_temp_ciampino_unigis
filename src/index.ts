import "./style.scss";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  CIAMPINO_CITY,
  ControlsPosition,
  latLong,
  ZOOM_LEVEL
} from "./lib/utils";
import {
  addLayerCiampino,
  addSourceCiampino
} from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";
import { Deck } from "deck.gl";
import { deckLayer } from "./layers/ciampino-buildings-3d";

const MAPTILER_API_KEY = "7hoRtEm5V28kPFvvHRho";
// #region Map initialization
export const initialBasemap = baseLayers[0];

// const map = new Map({
//   container: "map",
//   style: initialBasemap.url,
//   center: latLong,
//   zoom: ZOOM_LEVEL
// });
const map = new maplibregl.Map({
  style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`,
  center: [CIAMPINO_CITY.latitude, CIAMPINO_CITY.longitude],
  zoom: ZOOM_LEVEL,
  pitch: 45,
  bearing: -17.6,
  container: "map"
});
// #endregion

//#region Utils

// const modelLayer = new ThreeJSModelLayer({
//   modelPath: "/assets/ciampino_blosm_gltf_no_compr.gltf",
//   modelOrigin: [CIAMPINO_CITY.longitude, CIAMPINO_CITY.latitude], // Replace with your coordinates
//   modelAltitude: 0,
//   modelRotate: [Math.PI / 2, 0, 0], // Adjust rotation as needed
//   modelScale: 5, // Adjust scale as needed,
//   modelFormat: "gltf"
// });

// Function to add sources and layers to the map
const addSourcesAndLayers = () => {
  // Adding sources and layers on map
  if (!map.getSource(addSourceCiampino.id)) {
    map.addSource(addSourceCiampino.id, addSourceCiampino.args);
  }
  if (!map.getLayer(addLayerCiampino.id)) {
    map.addLayer(addLayerCiampino);
  }
};

// // Function to reload the LayersControl
// const reloadLayersControl = () => {
//   if (layersControl) {
//     map.removeControl(layersControl);
//   }
//   layersControl = new LayersControl();
//   map.addControl(layersControl, "top-right");
// };
//#endregion

// #region Loading map
map.on("load", () => {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;

  let labelLayerId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol" && layers[i].layout) {
      labelLayerId = layers[i].id;
      break;
    }
  }

  map.addSource("openmaptiles", {
    url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_API_KEY}`,
    type: "vector"
  });

  map.addLayer(
    {
      id: "3d-buildings",
      source: "openmaptiles",
      "source-layer": "building",
      type: "fill-extrusion",
      minzoom: 15,
      filter: ["!=", ["get", "hide_3d"], true],
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "render_height"],
          0,
          "lightgray",
          200,
          "royalblue",
          400,
          "lightblue"
        ],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          16,
          ["get", "render_height"]
        ],
        "fill-extrusion-base": [
          "case",
          [">=", ["get", "zoom"], 16],
          ["get", "render_min_height"],
          0
        ]
      }
    },
    labelLayerId
  );
});
// #endregion

// #region Listen for basemap changes and reload layers
map.on("styledata", () => {
  addSourcesAndLayers();
});
// #endregion

// #region Controls top-left
// Add navigation control (zoom buttons, compass, etc.)
map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: true,
    showCompass: true
  }),
  ControlsPosition.TOP_LEFT
);

// Add custom home control -> flyTo to initial position
map.addControl(new HomeControl(), ControlsPosition.TOP_LEFT);
// #endregion

// #region Control top-right
// Add geocodeer control from Nominatim OpenStreetMap API -> malibre-gl-geocoder plugin
map.addControl(geocoder, ControlsPosition.TOP_RIGHT);

// Add custom "Layers" control
map.addControl(new LayersControl(), ControlsPosition.TOP_RIGHT);
// #endregion

// #region Control bottom-right
// Add custom "Basemap" control
// map.addControl(
//   new BasemapControl({
//     basemaps: baseLayers,
//     initialBasemap: initialBasemap
//   }),
//   ControlsPosition.BOTTOM_RIGHT
// );
// #endregion

// Add deck overlay for 3D rendering
