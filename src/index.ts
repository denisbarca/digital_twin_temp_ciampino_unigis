import "./style.scss";
import maplibregl, { ScaleControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  addClickListener,
  CIAMPINO_CITY,
  ControlsPosition,
  mapMaxBoundsLngLat,
  ZOOM_LEVEL
} from "./lib/utils";
import { layerCiampino, sourceCiampino } from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";
import {
  layerBuildings2D,
  layerBuildings3D,
  sourceBuildings3D
} from "./layers/ciampino-buildings-3d";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  layerCiampinoTrees,
  sourceCiampinoTrees
} from "./layers/ciampino-trees";
import { layerTrees3D } from "./layers/ciampino-trees-3d";
import {
  colorLSTMapping,
  layerCiampinoLST,
  sourceCiampinoLST
} from "./layers/ciampino-lst";
import {
  colorCiampinoLanduseMapping,
  layerCiampinoLanduse,
  sourceCiampinoLanduse
} from "./layers/ciampino-landuse";
import { LegendLayersControl } from "./components/legend-layers-control";

// #region Map initialization
export const initialBasemap = baseLayers[0];

const map = new maplibregl.Map({
  style: initialBasemap.url,
  center: [CIAMPINO_CITY.coords.longitude, CIAMPINO_CITY.coords.latitude],
  zoom: ZOOM_LEVEL,
  container: "map",
  maxBounds: mapMaxBoundsLngLat()
});
// #endregion

//#region Add sources and layers to the map
const addSourcesAndLayers = () => {
  const sourcesAndLayers = [
    { source: sourceCiampinoLST, layer: layerCiampinoLST },
    { source: sourceCiampino, layer: layerCiampino },
    { source: sourceBuildings3D, layer: layerBuildings3D },
    { source: sourceBuildings3D, layer: layerBuildings2D },
    { source: sourceCiampinoTrees, layer: layerCiampinoTrees },
    { source: sourceCiampinoTrees, layer: layerTrees3D },
    { source: sourceCiampinoLanduse, layer: layerCiampinoLanduse }
  ];
  sourcesAndLayers.forEach(({ source, layer }) => {
    if (!map.getSource(source.id)) {
      map.addSource(source.id, source.args);
    }
    if (!map.getLayer(layer.id)) {
      const beneath =
        map.getLayer("3d-buildings") || map.getLayer("ciampino-trees-3d")
          ? "3d-buildings"
          : undefined;
      map.addLayer(layer, beneath);
    }
  });
};
//#endregion

// #region Loading map
map.on("load", async () => {
  addSourcesAndLayers();
});
// #endregion

// #region Listen for basemap changes and reload layers
map.on("styledata", () => {
  addSourcesAndLayers();
});
// #endregion

// #region Listen for change in zoom level
map.on("zoom", () => {
  const zoom = map.getZoom();
  if (zoom >= 15) {
    map.setLayoutProperty("ciampino-trees-2d", "visibility", "none");
    map.setLayoutProperty("2d-buildings", "visibility", "none");
    map.setLayoutProperty("ciampino-trees-3d", "visibility", "visible");
    map.setLayoutProperty("3d-buildings", "visibility", "visible");
  } else {
    map.setLayoutProperty("ciampino-trees-2d", "visibility", "visible");
    map.setLayoutProperty("2d-buildings", "visibility", "visible");
    map.setLayoutProperty("ciampino-trees-3d", "visibility", "none");
    map.setLayoutProperty("3d-buildings", "visibility", "none");
  }
});
// #endregion

// #region Interaction with map for popup
// Add click event listener for buildings layer
addClickListener(
  map,
  "3d-buildings",
  (feature) => `
  <div style="font-size: 18px; margin: 10px;">
    <strong>Building ID:</strong> ${feature.id}<br>
    <strong>Height:</strong> ${feature.properties.render_height} meters
  </div>
`
);
addClickListener(
  map,
  "2d-buildings",
  (feature) => `
  <div style="font-size: 18px; margin: 10px;">
    <strong>Building ID:</strong> ${feature.id}<br>
    <strong>Height:</strong> ${feature.properties.render_height} meters
  </div>
`
);

// Add click event listener for temperature layer
addClickListener(
  map,
  "ciampino-lst",
  (feature) => `
  <div style="font-size: 18px; margin: 10px;">
    <strong>Temperature:</strong> ${feature.properties.DN.toFixed(2)}<br>
  </div>
`
);

// Add click event listener for trees layer
addClickListener(
  map,
  "ciampino-trees-2d",
  (feature) => `
  <div style="font-size: 18px; margin: 10px;">
    <strong>Tree ID:</strong> ${feature.id ?? feature.properties.fid}<br>
  </div>
`
);
addClickListener(
  map,
  "ciampino-trees-3d",
  (feature) => `
  <div style="font-size: 18px; margin: 10px;">
    <strong>Tree ID:</strong> ${feature.id ?? feature.properties.fid}<br>
  </div>
`
);
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

// #region Control bottom-left
map.addControl(
  new ScaleControl({
    maxWidth: 275,
    unit: "metric"
  }),
  ControlsPosition.BOTTOM_LEFT
);
// Add custom list control
map.addControl(
  new LegendLayersControl(
    "Legend Land Surface Temperature",
    Object.entries(colorLSTMapping).map(([text, icon]) => ({ text, icon }))
  ),
  ControlsPosition.BOTTOM_LEFT
);
map.addControl(
  new LegendLayersControl(
    "Legend Ciampino Landuse",
    Object.entries(colorCiampinoLanduseMapping).map(([text, icon]) => ({
      text,
      icon
    }))
  ),
  ControlsPosition.BOTTOM_LEFT
);

// #endregion
