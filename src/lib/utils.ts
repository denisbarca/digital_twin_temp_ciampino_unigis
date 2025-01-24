import maplibregl, { LngLatLike } from "maplibre-gl";
import { City } from "./models/city";
import { sourceAddFeature } from "../layers/add-feature";
import { layerAddFeature } from "../layers/add-feature";

// #region Ciampino config
export const CIAMPINO_CITY: City = {
  name: "Ciampino",
  coords: {
    latitude: 41.7994,
    longitude: 12.61
  },
  minCoords: {
    longitude: 12.584052046857774,
    latitude: 41.775150522896986
  },
  maxCoords: {
    longitude: 12.644934317596181,
    latitude: 41.821556407355871
  }
};
// #endregion

// #region Map config
export const ZOOM_LEVEL = 13;
export const BASEMAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
export const latLong: LngLatLike = [
  CIAMPINO_CITY.coords.longitude,
  CIAMPINO_CITY.coords.latitude
];

export enum ControlsPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right"
}

export const MAPTILER_API_KEY = "7hoRtEm5V28kPFvvHRho";

const mapAreaMaxBounds = [
  [12.487787618563885, 41.84751040169695],
  [12.70894385200748, 41.845846295457335],
  [12.70760351119921, 41.72525000969142],
  [12.481979475059205, 41.728251009366176],
  [12.485553717215652, 41.847177583911986]
];

export const mapMaxBounds = (): [LngLatLike, LngLatLike] => {
  const lonAreaMaxBounds = mapAreaMaxBounds.map((coord) => coord[0]);
  const latAreaMaxBounds = mapAreaMaxBounds.map((coord) => coord[1]);

  const minLongitude = Math.min(...lonAreaMaxBounds);
  const maxLongitude = Math.max(...lonAreaMaxBounds);
  const minLatitude = Math.min(...latAreaMaxBounds);
  const maxLatitude = Math.max(...latAreaMaxBounds);
  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude]
  ];
};
// #endregion

// #region Popup on map click
const popup = new maplibregl.Popup({
  closeButton: true,
  closeOnClick: false
});

export const addClickListener = (
  map: maplibregl.Map,
  layerId: string,
  getDescription: (feature: maplibregl.MapGeoJSONFeature) => string
) => {
  map.on("click", layerId, (e) => {
    // Get the features at the point of click
    const features = map.queryRenderedFeatures(e.point, {
      layers: [layerId]
    });
    if (features.length) {
      // Get description and show popup
      const description = features.length
        ? getDescription(features[0])
        : "No feature information available";
      popup
        .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
        .setHTML(
          `${description}<br/><button id="add-feature-btn" style="margin-top: 10px; padding: 5px 10px; 
          background-color: #007bff; color: white; border: none; border-radius: 4px; 
          cursor: pointer; font-size: 16px; float: right;">Add Feature</button>`
        )
        .addTo(map);

      // Add button click event
      const addButton = document.getElementById("add-feature-btn");
      if (addButton) {
        addButton.addEventListener("click", () => {
          const { lng, lat } = e.lngLat;
          if (!map.getSource(sourceAddFeature.id)) {
            map.addSource(sourceAddFeature.id, sourceAddFeature.args);
          }
          if (!map.getLayer(layerAddFeature.id)) {
            map.addLayer(layerAddFeature);
          }

          // Get current data
          const source = map.getSource(
            sourceAddFeature.id
          ) as maplibregl.GeoJSONSource;
          const currentData = source._data as GeoJSON.FeatureCollection;

          // Create a new feature
          const newFeature: GeoJSON.Feature = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lng, lat]
            },
            properties: {}
          };

          // Update the GeoJSON source
          source.setData({
            type: "FeatureCollection",
            features: [...currentData.features, newFeature]
          });
          console.log(`Feature added at: ${lng}, ${lat}`);
          popup.remove();
        });
      }
    }
  });
};
// #endregion
