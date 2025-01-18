/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "@google/earthengine" {
  namespace ee {
    namespace Geometry {
      class Rectangle {
        constructor(coordinates: number[][]);
      }

      class Point {
        constructor(coordinates: number[]);
      }
    }

    class Image {
      visualize(params: any): Image;
      getMap(params: any, callback: (map: any) => void): void;
    }

    class ImageCollection {
      constructor(id: string);
      filterBounds(
        geometry: Geometry.Rectangle | Geometry.Point
      ): ImageCollection;
      filterDate(startDate: string, endDate: string): ImageCollection;
      sort(property: string): ImageCollection;
      first(): Image;
    }
  }
  export = ee;
}
