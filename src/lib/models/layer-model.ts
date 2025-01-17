export type LayerModel = {
  id: string | string[];
  name: string;
  symbol: LayerSymbol;
  hasSubClass: boolean;
  visible?: boolean;
};

export type LayerSymbol = {
  type: "point" | "line" | "polygon";
  width: number;
  height: number;
  color: string[];
};
