import "./style.scss";
import maplibregl, { Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { CIAMPINO_CITY, ControlsPosition, ZOOM_LEVEL } from "./lib/utils";
import {
  addLayerCiampino,
  addSourceCiampino
} from "./layers/ciampino-boundaries";
import { geocoder } from "./components/geocoder-api-control";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import { HomeControl } from "./components/home-custom-control";
import { LayersControl } from "./components/layers-custom-control";
import { baseLayers, BasemapControl } from "./components/basemap-control";
import {
  addLayerBuildings3D,
  addSourceBuildings3D
} from "./layers/ciampino-buildings-3d";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { addLayerTrees3D, addSourceTrees3D } from "./layers/ciampino-trees-3d";
import {
  addLayerCiampinoLanduse,
  addSourceCiampinoLanduse
} from "./layers/ciampino-landuse";
import { insertLayerBeneath } from "./layers/layers";
import {
  addLayerCiampinoTrees,
  addSourceCiampinoTrees
} from "./layers/ciampino-trees";

// #region Map initialization

export const initialBasemap = baseLayers[0];

const map = new maplibregl.Map({
  style: initialBasemap.url,
  center: [CIAMPINO_CITY.longitude, CIAMPINO_CITY.latitude],
  zoom: ZOOM_LEVEL,
  container: "map"
});
// #endregion

//#region Utils
// Function to add sources and layers to the map
const addSourcesAndLayers = () => {
  const sourcesAndLayers = [
    { source: addSourceCiampino, layer: addLayerCiampino },
    {
      source: addSourceBuildings3D,
      layer: addLayerBuildings3D,
      beneath: insertLayerBeneath(map)
    },
    { source: addSourceTrees3D, layer: addLayerTrees3D },
    {
      source: addSourceCiampinoLanduse,
      layer: addLayerCiampinoLanduse,
      beneath: insertLayerBeneath(map)
    },
    {
      source: addSourceCiampinoTrees,
      layer: addLayerCiampinoTrees,
      beneath: insertLayerBeneath(map)
    }
  ];

  sourcesAndLayers.forEach(({ source, layer, beneath }) => {
    if (!map.getSource(source.id)) {
      map.addSource(source.id, source.args);
    }
    if (!map.getLayer(layer.id)) {
      map.addLayer(layer, beneath);
    }
  });
};
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

// #region Interaction with map for popup
// Add click event listener for buildings layer
map.on("click", "3d-buildings", (e) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["3d-buildings"]
  });
  if (features.length) {
    const feature = features[0];
    const description = `
      <strong>Building ID:</strong> ${feature.id}<br>
      <strong>Height:</strong> ${feature.properties.render_height} meters
    `;
    new Popup()
      .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
      .setHTML(description)
      .addTo(map);
  }
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
