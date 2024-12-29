import {
  Deck,
  MapViewState,
  ScatterplotLayer
} from "../node_modules/deck.gl/dist/index";
import { MapboxOverlay } from "@deck.gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  accessToken:
    "pk.eyJ1IjoiZGVuaWJhcmNhIiwiYSI6ImNtNTVzNDlkdjB1d3gyanNkM3F4bWFyeGcifQ._5yBvUdqEG2jZrPWB-12Gw",
  center: [0.45, 51.47],
  zoom: 11
});

map.once("load", () => {
  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new ScatterplotLayer({
        id: "deckgl-circle",
        data: [{ position: [0.45, 51.47] }],
        getPosition: (d) => d.position,
        beforeId: "waterway-label" // In interleaved mode render the layer under map labels
      })
    ]
  });

  map.addControl(deckOverlay as unknown as mapboxgl.IControl);
});

//   const INITIAL_VIEW_STATE: MapViewState = {
//     latitude: 37.8,
//     longitude: -122.45,
//     zoom: 1
//   };

//   type DataType = {
//     position: [longitude: number, latitude: number];
//     color: [r: number, g: number, b: number];
//     radius: number;
//   };

//   const canvasElement = document.getElementById(
//     "deck-canvas"
//   ) as HTMLCanvasElement;

//   const deckInstance = new Deck({
//     canvas: canvasElement,
//     map:
//     initialViewState: INITIAL_VIEW_STATE,
//     controller: true,
//     layers: [
//       new ScatterplotLayer<DataType>({
//         data: [{ position: [-122.45, 37.8], color: [255, 0, 0], radius: 100 }],
//         getPosition: (d: DataType) => d.position,
//         getFillColor: (d: DataType) => d.color,
//         getRadius: (d: DataType) => d.radius
//       })
//     ]
//   });
