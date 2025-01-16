import * as fs from "fs";
import * as path from "path";

// Load the GeoJSON file
const geojsonFilePath = path.resolve(
  __dirname,
  "../assets/layers/landuse_polygons.geojson"
);
const geojsonData = JSON.parse(fs.readFileSync(geojsonFilePath, "utf8"));

// Extract unique code_2018 and class_2018 values
const code2018Set = new Set<string>();
const class2018Set = new Set<string>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
geojsonData.features.forEach((feature: any) => {
  if (feature.properties) {
    if (feature.properties.code_2018) {
      code2018Set.add(feature.properties.code_2018);
    }
    if (feature.properties.class_2018) {
      class2018Set.add(feature.properties.class_2018);
    }
  }
});

// Convert sets to arrays
const code2018Array = Array.from(code2018Set);
const class2018Array = Array.from(class2018Set);

// Output the results
console.log("Unique code_2018 values:", code2018Array);
console.log("Unique class_2018 values:", class2018Array);
