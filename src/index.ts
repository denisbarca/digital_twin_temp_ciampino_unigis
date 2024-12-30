import {
  Deck,
  MapViewState,
  ScatterplotLayer
} from "../node_modules/deck.gl/dist/index";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const map = new Map({
  container: "map",
  style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  center: [0.45, 51.47],
  zoom: 11
});

await map.once("load");

const deckOverlay = new MapboxOverlay({
  interleaved: true,
  layers: [
    new ScatterplotLayer({
      id: "deckgl-circle",
      data: [{ position: [0.45, 51.47] }],
      getPosition: (d) => d.position,
      beforeId: "watername_ocean" // In interleaved mode render the layer under map labels
    })
  ]
});

map.addControl(deckOverlay);
