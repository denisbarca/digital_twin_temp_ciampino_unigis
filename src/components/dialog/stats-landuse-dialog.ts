import { setStatsChart } from "../../lib/utils";

const statsLanduseOptions = {
  title: {
    text: "Land Use Stats",
    subtext: "Percentage of Area for each category of Land Use"
  },
  dataset: [
    {
      dimensions: ["class", "count", "percentage"],
      source: [
        ["Sports and leisure facilities", 8, 0.12],
        ["Railways and associated land", 12, 0.18],
        ["Permanent crops (vineyards, fruit trees, olive groves)", 24, 1.22],
        ["Pastures", 62, 1.68],
        ["Other roads and associated land", 3, 88.28],
        ["Mineral extraction and dump sites", 6, 0.09],
        ["Land without current use", 16, 0.06],
        ["Isolated structures", 15, 0.05],
        ["Industrial, commercial, public, military and private units", 64, 1.0],
        ["Green urban areas", 4, 0.07],
        ["Forests", 1, 0.02],
        ["Discontinuous very low density urban fabric (S.L. : < 10%)", 4, 0.03],
        [
          "Discontinuous medium density urban fabric (S.L. : 30% - 50%)",
          52,
          0.99
        ],
        ["Discontinuous low density urban fabric (S.L. : 10% - 30%)", 53, 0.84],
        ["Discontinuous dense urban fabric (S.L. : 50% -  80%)", 129, 1.36],
        ["Continuous urban fabric (S.L. : > 80%)", 62, 0.44],
        ["Construction sites", 1, 0.0],
        ["Arable land (annual crops)", 47, 2.12],
        ["Airports", 1, 1.45]
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
  },
  grid: {
    bottom: "30%",
    top: "10%" // Increase bottom margin for x-axis labels
  }
};

// Method to open the first stats dialog and initialize ECharts
export const onStatsChartsLanduse = () => {
  // Initialize ECharts
  setStatsChart("chart-container-landuse", statsLanduseOptions);
};
