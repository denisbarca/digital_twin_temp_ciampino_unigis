import { Map, IControl, LngLat } from "maplibre-gl";
import maplibregl from "maplibre-gl/dist/maplibre-gl";

// Define the custom "Ruler" control
export class RulerControl implements IControl {
  private map: Map | undefined;
  private container: HTMLElement | undefined;
  private startPoint: LngLat | undefined;
  private endPoint: LngLat | undefined;
  private line: GeoJSON.Feature<GeoJSON.LineString> | undefined;

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this.container.style.padding = "10px";

    const button = document.createElement("button");
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
        </svg>
      `;
    button.title = "Ruler";
    button.onclick = () => {
      this.toggleRuler();
    };
    this.container.appendChild(button);

    return this.container;
  }

  toggleRuler(): void {
    if (this.map) {
      this.map.getCanvas().style.cursor = "crosshair";
      this.map.on("click", this.onClick.bind(this));
    }
  }

  onClick(e: maplibregl.MapMouseEvent): void {
    if (this.map) {
      if (!this.startPoint) {
        this.startPoint = e.lngLat;
      } else if (!this.endPoint) {
        this.endPoint = e.lngLat;
        this.drawLine();
        this.map?.off("click", this.onClick.bind(this));
        this.map.getCanvas().style.cursor = "";
      }
    }
  }

  drawLine(): void {
    if (this.map && this.startPoint && this.endPoint) {
      const coordinates = [this.startPoint.toArray(), this.endPoint.toArray()];
      this.line = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates
        },
        properties: {}
      };
      this.map.addSource("ruler-line", {
        type: "geojson",
        data: this.line
      });
      this.map.addLayer({
        id: "ruler-line",
        type: "line",
        source: "ruler-line",
        layout: {},
        paint: {
          "line-color": "#ff0000",
          "line-width": 2
        }
      });
    }
  }

  onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.map) {
      this.map.off("click", this.onClick.bind(this));
      if (this.map.getLayer("ruler-line")) {
        this.map.removeLayer("ruler-line");
      }
      if (this.map.getSource("ruler-line")) {
        this.map.removeSource("ruler-line");
      }
    }
    this.map = undefined;
  }
}
