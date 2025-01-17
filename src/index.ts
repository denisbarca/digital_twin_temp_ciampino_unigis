import "./style.scss";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  addClickListener,
  CIAMPINO_CITY,
  ControlsPosition,
  ZOOM_LEVEL
} from "./lib/utils";
import { layerCiampino, sourceCiampino } from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";
import {
  layerBuildings3D,
  sourceBuildings3D
} from "./layers/ciampino-buildings-3d";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  layerCiampinoTrees,
  sourceCiampinoTrees
} from "./layers/ciampino-trees";
import { layerTrees3D } from "./layers/ciampino-trees-3d";
import { RasterSatelliteLoaderService } from "./services/raster-satellite-loader.service";

// #region Map initialization
export const initialBasemap = baseLayers[0];
const rasterService = new RasterSatelliteLoaderService();

const map = new maplibregl.Map({
  style: initialBasemap.url,
  center: [CIAMPINO_CITY.longitude, CIAMPINO_CITY.latitude],
  zoom: ZOOM_LEVEL,
  container: "map"
});
// #endregion

//#region Add sources and layers to the map
const addSourcesAndLayers = () => {
  const sourcesAndLayers = [
    { source: sourceCiampino, layer: layerCiampino },
    { source: sourceBuildings3D, layer: layerBuildings3D },
    { source: sourceCiampinoTrees, layer: layerCiampinoTrees },
    { source: sourceCiampinoTrees, layer: layerTrees3D }
  ];

  sourcesAndLayers.forEach(({ source, layer }) => {
    if (!map.getSource(source.id)) {
      map.addSource(source.id, source.args);
    }
    if (!map.getLayer(layer.id)) {
      const beneath = map.getLayer("3d-buildings") ? "3d-buildings" : undefined;
      map.addLayer(layer, beneath);
    }
  });
};
//#endregion

// #region Loading map
map.on("load", () => {
  console.log("Private Key:", rasterService["privateKey"]);
  rasterService.initialize();
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
    map.setLayoutProperty("ciampino-trees-3d", "visibility", "visible");
  } else {
    map.setLayoutProperty("ciampino-trees-2d", "visibility", "visible");
    map.setLayoutProperty("ciampino-trees-3d", "visibility", "none");
  }
});
// #endregion

// #region Interaction with map for popup
// Add click event listener for buildings layer
addClickListener(
  map,
  "3d-buildings",
  (feature) => `
  <strong>Building ID:</strong> ${feature.id}<br>
  <strong>Height:</strong> ${feature.properties.render_height} meters
`
);

// Add click event listener for trees layer
addClickListener(
  map,
  "ciampino-trees-2d",
  (feature) => `
  <strong>Tree ID:</strong> ${feature.id ?? feature.properties.fid}<br>
`
);
addClickListener(
  map,
  "ciampino-trees-3d",
  (feature) => `
  <strong>Tree ID:</strong> ${feature.id ?? feature.properties.fid}<br>
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
