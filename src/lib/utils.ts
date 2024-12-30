import { LngLatLike } from "maplibre-gl";
import { city } from "./models/city";

export const CIAMPINO_CITY: city = {
  name: "Ciampino",
  latitude: 41.7994,
  longitude: 12.61
};

export const ZOOM_LEVEL = 13;
export const BASEMAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
export const latLong: LngLatLike = [
  CIAMPINO_CITY.longitude,
  CIAMPINO_CITY.latitude
];
