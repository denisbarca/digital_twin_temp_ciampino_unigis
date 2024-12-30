import { Map, IControl } from "maplibre-gl";
import { latLong, ZOOM_LEVEL } from "../lib/utils";

// Define the custom "Home" control
export class HomeControl implements IControl {
  private map: Map | undefined;
  private container: HTMLElement | undefined;

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    const button = document.createElement("button");
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    `;
    button.title = "Home";
    button.onclick = () => {
      if (this.map) {
        this.map.flyTo({ center: latLong, zoom: ZOOM_LEVEL });
      }
    };
    this.container.appendChild(button);
    return this.container;
  }

  onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
  }
}
