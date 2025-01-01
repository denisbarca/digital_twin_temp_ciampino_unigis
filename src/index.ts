import "./style.scss";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ControlsPosition, latLong, ZOOM_LEVEL } from "./lib/utils";
import {
  addLayerCiampino,
  addSourceCiampino
} from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";

// #region Map initialization
export const initialBasemap = baseLayers[0];

const map = new Map({
  container: "map",
  style: initialBasemap.url,
  center: latLong,
  zoom: ZOOM_LEVEL
});
// #endregion

//#region Utils
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
  addSourcesAndLayers();
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
map.addControl(
  new BasemapControl({
    basemaps: baseLayers,
    initialBasemap: initialBasemap
  }),
  ControlsPosition.BOTTOM_RIGHT
);
// #endregion

// Add deck overlay for 3D rendering
