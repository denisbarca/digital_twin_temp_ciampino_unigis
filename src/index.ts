import "./style.scss";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { latLong, ZOOM_LEVEL } from "./lib/utils";
import { deckOverlay } from "./components/deck-overlay-control";
import {
  addLayerCiampino,
  addSourceCiampino
} from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";

export const initialBasemap = baseLayers[0];
// Create a new map instance
const map = new Map({
  container: "map",
  style: initialBasemap.url,
  center: latLong,
  zoom: ZOOM_LEVEL
});

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

// Function to reload the LayersControl
const reloadLayersControl = () => {
  if (layersControl) {
    map.removeControl(layersControl);
  }
  layersControl = new LayersControl();
  map.addControl(layersControl, "top-right");
};

// Loading map
map.on("load", () => {
  console.log("Map loaded");

  addSourcesAndLayers();
  layersControl.updateLayerCheckboxes();
});

// Listen for basemap changes and reload layers
map.on("styledata", () => {
  console.log("Style data loaded");

  addSourcesAndLayers();
  reloadLayersControl();
});

// Add custom "Basemap" control
map.addControl(
  new BasemapControl({
    basemaps: baseLayers,
    initialBasemap: initialBasemap
  }),
  "bottom-right"
);

// Add navigation control (zoom buttons, compass, etc.)
map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: true,
    showCompass: true
  }),
  "top-left"
);

// Add custom "Layers" control
let layersControl = new LayersControl();
map.addControl(layersControl, "top-right");

// Add geocodeer control from Nominatim OpenStreetMap API -> malibre-gl-geocoder plugin
map.addControl(geocoder, "top-right");

// Add deck overlay for 3D rendering
map.addControl(deckOverlay);

// Add custom home control -> flyTo to initial position
map.addControl(new HomeControl(), "top-left");
