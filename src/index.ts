import "./style.scss";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { BASEMAP_STYLE, latLong, ZOOM_LEVEL } from "./lib/utils";
import { deckOverlay } from "./components/deck-overlay-control";
import {
  addLayerCiampino,
  addSourceCiampino
} from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";

// Create a new map instance
const map = new Map({
  container: "map",
  style: BASEMAP_STYLE,
  center: latLong,
  zoom: ZOOM_LEVEL
});

// Loading map
map.on("load", () => {
  // Adding sources and layers on map
  map.addSource(addSourceCiampino.id, addSourceCiampino.args);
  map.addLayer(addLayerCiampino);
});

// Add navigation control (zoom buttons, compass, etc.)
map.addControl(
  new maplibregl.NavigationControl({
    visualizePitch: true,
    showZoom: true,
    showCompass: true
  }),
  "top-left"
);

// Add geocodeer control from Nominatim OpenStreetMap API -> malibre-gl-geocoder plugin
map.addControl(geocoder);

// Add deck overlay for 3D rendering
map.addControl(deckOverlay);

// Add custom home control -> flyTo to initial position
map.addControl(new HomeControl(), "top-left");

// Add custom "Layers" control
map.addControl(new LayersControl(), "top-right");
