import { LngLatLike, Popup } from "maplibre-gl";
import { City } from "./models/city";

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

export const addClickListener = (
  map: maplibregl.Map,
  layerId: string,
  getDescription: (feature: maplibregl.MapGeoJSONFeature) => string
) => {
  map.on("click", layerId, (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [layerId]
    });
    console.log(features);

    if (features.length) {
      const feature = features[0];
      const description = getDescription(feature);
      new Popup()
        .setLngLat({ lng: e.lngLat.lng, lat: e.lngLat.lat })
        .setHTML(description)
        .addTo(map);
    }
  });
};
