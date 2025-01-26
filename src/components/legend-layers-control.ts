import { Map, IControl } from "maplibre-gl";
import { LayerModel } from "../lib/models/layer-model";
import { DialogType, openDialog } from "../lib/utils";

// Define the custom "Layers" control
export class LegendLayersControl implements IControl {
  // #region Variables
  private map: Map | undefined;
  private container: HTMLElement | undefined;
  private layers: LayerModel[] = [];
  private title: string;
  private items: { text: string; icon: string }[];
  private dialogConfig: {
    idButton: string;
    idDialog: string;
    dialogType: DialogType;
  };
  private listContainer: HTMLElement | undefined;
  private toggleIcon: HTMLElement | undefined;
  private isCollapsed: boolean = true;
  // #endregion

  // #region Constructor
  constructor(
    title: string,
    items: { text: string; icon: string }[],
    dialogConfig: { idButton: string; idDialog: string; dialogType: DialogType }
  ) {
    this.title = title;
    this.items = items;
    this.dialogConfig = dialogConfig;
  }
  // #endregion

  // #region Methods implementd
  onAdd() {
    this.container = this._setMainContainer();

    const titleContainer = this._setTitleContainer();
    this.container.appendChild(titleContainer);

    this.listContainer = this._setListContainer();
    this.container.appendChild(this.listContainer);

    window.addEventListener("resize", this._applyResponsiveStyles.bind(this));

    return this.container;
  }

  onRemove() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.map = undefined;
    window.addEventListener("resize", this._applyResponsiveStyles.bind(this));
  }
  // #endregion

  // #region Utils
  private _applyResponsiveStyles(): void {
    if (this.container) {
      if (window.innerWidth <= 641) {
        this.container.style.width = "300px";
      } else {
        this.container.style.width = "220px";
      }
    }
  }

  private _setMainContainer = (): HTMLElement => {
    this.container = document.createElement("div");
    this.container.className = "maplibregl-ctrl maplibregl-ctrl-group";
    this.container.style.backgroundColor = "white";
    this.container.style.width = "300px";
    this.container.style.padding = "10px";
    this.container.style.borderRadius = "4px";
    this.container.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
    this.container.style.fontFamily =
      "Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif";
    return this.container;
  };

  private _setTitleContainer = (): HTMLDivElement => {
    const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.justifyContent = "space-between";
    titleContainer.style.alignItems = "center";

    const title = document.createElement("h3");
    title.innerText = this.title;
    titleContainer.appendChild(title);

    const iconsContainer = document.createElement("div");
    iconsContainer.style.display = "flex";
    iconsContainer.style.alignItems = "center";
    iconsContainer.style.gap = "3px";

    const statsButton = document.createElement("button");
    statsButton.innerHTML = `<img src="assets/images/diagram.png" alt="Stats" width="16" height="16">`;
    statsButton.id = "statsButton";
    statsButton.style.fontSize = "16px";
    statsButton.style.cursor = "pointer";
    statsButton.addEventListener("click", () =>
      openDialog(this.dialogConfig.idDialog, this.dialogConfig.dialogType)
    );
    iconsContainer.appendChild(statsButton);

    this.toggleIcon = document.createElement("span");
    this.toggleIcon.innerHTML = "&#9660;";
    this.toggleIcon.style.fontSize = "16px";
    this.toggleIcon.style.cursor = "pointer";
    this.toggleIcon.addEventListener("click", this._toggleList.bind(this));
    iconsContainer.appendChild(this.toggleIcon);

    titleContainer.appendChild(iconsContainer);
    return titleContainer;
  };

  private _setListContainer = (): HTMLElement => {
    this.listContainer = document.createElement("div");
    this.listContainer.style.overflowY = "auto";
    this.listContainer.style.maxHeight = "200px";
    this.listContainer.style.display = "none"; // Initially hide the list container
    this.listContainer.style.flexDirection = "column";
    this.listContainer.style.scrollbarWidth = "thin"; // Prettier scroll
    this.listContainer.style.scrollbarColor = "#888 #e0e0e0"; // Prettier scroll
    return this.listContainer;
  };

  private _renderItems() {
    this.items.forEach((item) => {
      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";
      row.style.gap = "20px";
      row.style.padding = "5px";
      row.style.marginBottom = "5px";

      const icon = document.createElement("div");
      icon.style.border = "1px solid black";
      icon.style.width = "16px";
      icon.style.height = "16px";
      icon.style.backgroundColor = item["icon"];
      icon.style.flexShrink = "0";

      const text = document.createElement("span");
      text.innerText = item.text;

      row.appendChild(text);
      row.appendChild(icon);
      if (this.listContainer) this.listContainer.appendChild(row);
    });
  }
  // #endregion

  // #region Actions
  private _toggleList() {
    if (this.listContainer) {
      this.isCollapsed = !this.isCollapsed;
      this.listContainer.style.display = this.isCollapsed ? "none" : "flex";
      if (!this.isCollapsed) {
        this._renderItems();
        this.listContainer.style.display = "flex";
      } else {
        this.listContainer.innerHTML = "";
        this.listContainer.style.display = "none";
      }
      if (this.toggleIcon)
        this.toggleIcon.innerHTML = this.isCollapsed ? "&#9660;" : "&#9650;";
    }
  }
  // #endregion
}
