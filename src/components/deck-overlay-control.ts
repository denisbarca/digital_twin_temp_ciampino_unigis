import { MapboxOverlay } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "deck.gl";
import { latLong } from "../lib/utils";

export const deckOverlay = new MapboxOverlay({
  interleaved: true, // In interleaved mode render the layer under map labels
  layers: [
    new ScatterplotLayer({
      id: "deckgl-circle",
      data: [{ position: latLong }],
      getPosition: (d) => d.position,
      beforeId: "watername_ocean"
    })
  ]
});
