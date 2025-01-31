import { Map, IControl } from "maplibre-gl";
import { Basemap } from "../lib/models/basemap";
import basicV2Image from "../assets/images/basic-v2.png";
import basicV2DarkImage from "../assets/images/basic-v2dark.png";
import hybridImage from "../assets/images/hybrid.png";
import openstreetmapImage from "../assets/images/openstreetmap.png";
import { MAPTILER_API_KEY } from "../config/config";

const basicV2: Basemap = {
  name: "BasicV2",
  url: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`,
  image: basicV2Image
};
const basicV2Dark: Basemap = {
  name: "BasicV2 Dark",
  url: `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=${MAPTILER_API_KEY}`,
  image: basicV2DarkImage
};
const openStreetMap: Basemap = {
  name: "OpenStreetMap",
  url: `https://api.maptiler.com/maps/openstreetmap/style.json?key=${MAPTILER_API_KEY}`,
  image: openstreetmapImage
};
const satellite: Basemap = {
  name: "Satellite",
  url: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
  image: hybridImage
};

export const baseLayers: Basemap[] = [
  basicV2,
  basicV2Dark,
  openStreetMap,
  satellite
];

export interface BasemapControlOptions {
  basemaps: Basemap[];
  initialBasemap: Basemap;
}

// Define the custom "Home" control
export class BasemapControl implements IControl {
  private map: Map | undefined;
  private container: HTMLElement | undefined;
  private basemaps: Basemap[];
  private initialBasemap: Basemap;

  constructor(options: BasemapControlOptions) {
    this.basemaps = options.basemaps;
    this.initialBasemap = options.initialBasemap;
  }

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "row";
    this.container.style.alignItems = "center";
    this.container.style.padding = "10px";
    this.container.style.background = "none";
    this.container.style.boxShadow = "none";

    this.basemaps.forEach((basemap) => {
      const button = document.createElement("button");
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.borderRadius = "50%";
      button.style.margin = "5px";
      button.style.backgroundImage = `url(${basemap.image})`;
      button.style.backgroundSize = "cover";
      button.style.border = "1px solid gold";
      button.style.cursor = "pointer";
      button.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      button.title = basemap.name;
      button.onclick = () => {
        if (this.map) {
          this.map.setStyle(basemap.url);
        }
      };
      if (this.container) {
        this.container.appendChild(button);
      }
    });

    // Set the initial basemap
    if (this.map) {
      this.map.setStyle(this.initialBasemap.url);
    }

    return this.container;
  }

  onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
  }
}
