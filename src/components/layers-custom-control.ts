import { Map, IControl } from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { getLayersLegend } from "../layers/layers";
import { colorMapping } from "../layers/ciampino-landuse";

// Define the custom "Layers" control
export class LayersControl implements IControl {
  private map: Map | undefined;
  private container: HTMLElement | undefined;
  private layers: LayerModel[] = [];

  onAdd(map: Map): HTMLElement {
    this.map = map;
    this.container = this._setContainer();

    const layerList = this._setLayerList();
    this.container.appendChild(layerList);

    this.layers = getLayersLegend();
    this.layers.forEach((layer) => {
      const layerItem = this._setLayerItem(layer);
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

  // Set container
  private _setContainer(): HTMLElement {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this.container.style.fontFamily =
      "Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif";
    this._applyResponsiveStyles();
    this.container.style.padding = "10px";
    return this.container;
  }

  // Set legend title
  private _setLayerList(): HTMLDivElement {
    const layerList = document.createElement("div");
    layerList.className = "layer-list";
    layerList.innerHTML = "Layers list";
    layerList.style.fontSize = "14px";
    layerList.style.fontStyle = "italic";
    layerList.style.fontWeight = "bold";
    return layerList;
  }

  // Set legend row
  private _setLayerItem(layer: LayerModel): HTMLDivElement {
    const layerItem = this._setLayerItemContainer(layer.id);
    if (layer.id === "ciampino-landuse") {
      const layerTitleLanduse = this._setLayerTitleLanduse();
      layerItem.appendChild(layerTitleLanduse);
      Object.keys(colorMapping).forEach((className) => {
        const classItem = this._setSubClassItem(
          className as keyof typeof colorMapping
        );
        layerTitleLanduse.appendChild(classItem);
      });
    } else {
      const layerInfo = this._setLayerInfo();
      const layerIcon = this._setLayerIcon(layer);

      let checkbox;
      if (this.map) {
        checkbox = this._setCheckbox(this.map, layer);
      }

      const label = document.createElement("label");
      label.textContent = layer.name;

      layerInfo.appendChild(label);
      layerInfo.appendChild(layerIcon);
      layerInfo.appendChild(document.createTextNode(layer.name));
      layerItem.appendChild(layerInfo);
      if (checkbox) layerItem.appendChild(checkbox);
    }
    return layerItem;
  }

  // Set container for legend row
  private _setLayerItemContainer(layerId: string): HTMLDivElement {
    const layerItem = document.createElement("div");
    layerItem.style.marginTop = "20px";
    layerItem.style.fontSize = "12px";
    layerItem.style.fontWeight = "normal";
    if (layerId === "ciampino-landuse") {
      layerItem.style.display = "flex";
      layerItem.style.justifyContent = "space-between";
      layerItem.style.alignItems = "center";
    }
    return layerItem;
  }

  // Set layer info in row
  private _setLayerInfo(): HTMLDivElement {
    const layerInfo = document.createElement("div");
    layerInfo.style.display = "flex";
    layerInfo.style.alignItems = "center";
    return layerInfo;
  }

  // Set layer icon in row
  private _setLayerIcon(layer: LayerModel): HTMLDivElement {
    const layerIcon = document.createElement("div");
    layerIcon.style.width = layer.symbol.width.toString() + "px";
    layerIcon.style.height = layer.symbol.height.toString() + "px";
    layerIcon.style.background = this._createGradientBackground(
      layer.symbol.color
    );
    layerIcon.style.marginLeft = "5px";
    return layerIcon;
  }

  // Set checkbox in row
  private _setCheckbox(map: Map, layer: LayerModel): HTMLInputElement {
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
    return checkbox;
  }

  // Set container title for legend Ciampino landuse
  private _setLayerTitleLanduse(): HTMLDivElement {
    const landuseTitle = document.createElement("div");
    landuseTitle.innerHTML = "Ciampino Landuse";
    landuseTitle.style.fontWeight = "bold";
    return landuseTitle;
  }

  private _setSubClassItem(
    className: keyof typeof colorMapping
  ): HTMLDivElement {
    const classItem = document.createElement("div");
    classItem.style.display = "flex";
    classItem.style.alignItems = "center";
    classItem.style.marginTop = "5px";

    const classColor = document.createElement("div");
    classColor.style.width = "12px";
    classColor.style.height = "12px";
    classColor.style.backgroundColor = colorMapping[className];
    classColor.style.marginRight = "5px";

    const classLabel = document.createElement("div");
    classLabel.innerHTML = className;

    classItem.appendChild(classColor);
    classItem.appendChild(classLabel);
    return classItem;
  }

  private _createGradientBackground(colors: string[]): string {
    if (colors.length === 1) {
      return colors[0];
    }
    const gradientStops = colors.map((color, index) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    });
    return `linear-gradient(90deg, ${gradientStops.join(", ")})`;
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

// updateLayerCheckboxes(): void {
//   if (!this.map || !this.container) {
//     console.log("Map or container not found");

//     this.onRemove();
//     this.onAdd(this.map as Map);
//   }

//   const checkboxes = Array.from(
//     this.container?.querySelectorAll<HTMLInputElement>(
//       "input.layer-toggle"
//     ) || []
//   );
//   checkboxes.forEach((checkbox, index) => {
//     const layer = this.layers[index];
//     if (layer) {
//       checkbox.checked = true;
//       console.log(checkbox);
//     }
//   });
// }

// private _toggleLayerList(): void {
//   const layerList = this.container?.querySelector(".layer-list");
//   if (layerList) {
//     (layerList as HTMLElement).style.display =
//       (layerList as HTMLElement).style.display === "none" ? "block" : "none";
//   }
// }
