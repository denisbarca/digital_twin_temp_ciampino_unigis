import { setStatsChart } from "../../lib/utils";

const statsLSTOptions = {
  title: {
    text: "Land Surface Temperature Stats",
    subtext: "Percentage of Area for each range of Land Surface Temperature"
  },
  dataset: [
    {
      dimensions: ["class", "percentage"],
      source: [
        ["34-37", 0.05 + 0.27 + 0.95],
        ["37-40", 6.53 + 15.6 + 33.87],
        ["40-43", 22.55 + 8.13 + 3.33],
        ["43-45", 2.1 + 5.91],
        ["45", 0.71],
        ["0-4", 0],
        ["4-7", 0],
        ["7-10", 0],
        ["10-13", 0],
        ["13-16", 0],
        ["16-19", 0],
        ["19-22", 0],
        ["22-25", 0],
        ["25-28", 0],
        ["28-31", 0],
        ["31-34", 0]
      ]
    },
    {
      transform: {
        type: "sort",
        config: { dimension: "percentage", order: "desc" }
      }
    }
  ],
  xAxis: {
    type: "category",
    axisLabel: { interval: 0, rotate: 30, margin: 15 }
  },
  yAxis: {},
  series: {
    type: "bar",
    encode: { x: "class", y: "percentage" },
    datasetIndex: 1
  }
};

// Method to open the first stats dialog and initialize ECharts
export const onStatsChartsLST = () => {
  // Initialize ECharts
  setStatsChart("chart-container-lst", statsLSTOptions);
};
