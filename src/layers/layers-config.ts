// Setting layer legend size for height and width
export const mapLayerWidth: Record<string, number> = {
  line: 50,
  polygon: 12,
  point: 12
};
export const mapLayerHeight: Record<string, number> = {
  line: 6,
  polygon: 12,
  point: 12
};

// Calculate bounding box from multipolygon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getBoundingBox = (coordinates: any) => {
//   let minLng = Infinity;
//   let maxLng = -Infinity;
//   let minLat = Infinity;
//   let maxLat = -Infinity;

//   if (coordinates) {
//     coordinates[0][0].forEach((coord: [number, number]) => {
//       const [lng, lat] = coord;
//       minLng = Math.min(minLng, lng);
//       maxLng = Math.max(maxLng, lng);
//       minLat = Math.min(minLat, lat);
//       maxLat = Math.max(maxLat, lat);
//     });
//   }
//   console.log({ minLng, maxLng, minLat, maxLat });

//   return { minLng, maxLng, minLat, maxLat };
// };
