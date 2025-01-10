import { Map, IControl } from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { getLayersLegend } from "../layers/layers";
import { defaultColorCiampino } from "../layers/ciampino-boundaries";

// Define the custom "Layers" control
export class LayersControl implements IControl {
  private map: Map | undefined;
  private container: HTMLElement | undefined;
  private layers: LayerModel[] = [];

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this.container.style.fontFamily =
      "Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif";
    this._applyResponsiveStyles();
    this.container.style.padding = "10px";

    const layerList = document.createElement("div");
    layerList.className = "layer-list";
    layerList.innerHTML = "Layers list";
    layerList.style.fontSize = "14px";
    layerList.style.fontStyle = "italic";
    layerList.style.fontWeight = "bold";
    this.container.appendChild(layerList);

    this.layers = getLayersLegend();
    this.layers.forEach((layer) => {
      const layerItem = document.createElement("div");
      layerItem.style.marginTop = layer === this.layers[0] ? "20px" : "10px";
      layerItem.style.fontSize = "12px";
      layerItem.style.fontWeight = "normal";
      layerItem.style.display = "flex";
      layerItem.style.justifyContent = "space-between";
      layerItem.style.alignItems = "center";

      const layerInfo = document.createElement("div");
      layerInfo.style.display = "flex";
      layerInfo.style.alignItems = "center";

      const layerIcon = document.createElement("div");
      layerIcon.style.width = layer.symbol.width.toString() + "px";
      layerIcon.style.height = layer.symbol.height.toString() + "px";
      layerIcon.style.backgroundColor = defaultColorCiampino;
      layerIcon.style.marginLeft = "10px";

      const checkbox = document.createElement("input");
      checkbox.className = "layer-toggle";
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.onchange = () => {
        if (checkbox.checked) {
          map.setLayoutProperty(layer.id, "visibility", "visible");
        } else {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      };
      const label = document.createElement("label");
      label.textContent = layer.name;
      layerInfo.appendChild(checkbox);
      layerInfo.appendChild(label);
      layerItem.appendChild(layerInfo);
      layerItem.appendChild(layerIcon);
      layerList.appendChild(layerItem);
    });

    window.addEventListener("resize", this._applyResponsiveStyles.bind(this));
    return this.container;
  }

  onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
    window.addEventListener("resize", this._applyResponsiveStyles.bind(this));
  }

  private _toggleLayerList(): void {
    const layerList = this.container?.querySelector(".layer-list");
    if (layerList) {
      (layerList as HTMLElement).style.display =
        (layerList as HTMLElement).style.display === "none" ? "block" : "none";
    }
  }

  updateLayerCheckboxes(): void {
    if (!this.map || !this.container) {
      console.log("Map or container not found");

      this.onRemove();
      this.onAdd(this.map as Map);
    }

    const checkboxes = Array.from(
      this.container?.querySelectorAll<HTMLInputElement>(
        "input.layer-toggle"
      ) || []
    );
    checkboxes.forEach((checkbox, index) => {
      const layer = this.layers[index];
      if (layer) {
        checkbox.checked = true;
        console.log(checkbox);
      }
    });
  }

  private _applyResponsiveStyles(): void {
    if (this.container) {
      if (window.innerWidth <= 641) {
        this.container.style.width = "300px";
      } else {
        this.container.style.width = "220px";
      }
    }
  }
}
