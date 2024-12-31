import { Map, IControl } from "maplibre-gl";
import { Basemap } from "../lib/models/basemap";
import positronImage from "../assets/images/positron.png";
import darkMatterImage from "../assets/images/dark_matter.png";
import voyagerImage from "../assets/images/voyager.png";

const cartoPositron: Basemap = {
  name: "Positron",
  url: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  image: positronImage
};
const cartoDarkMatter: Basemap = {
  name: "Dark Matter",
  url: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  image: darkMatterImage
};
const cartoVoyager: Basemap = {
  name: "Voyager",
  url: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  image: voyagerImage
};

export const baseLayers: Basemap[] = [
  cartoPositron,
  cartoDarkMatter,
  cartoVoyager
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
