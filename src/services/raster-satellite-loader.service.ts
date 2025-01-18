/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ee from "@google/earthengine";

// const API_KEY = "AIzaSyC9Y0W_eM8IDcrE7q_nzzjNd5mnCABQhTg";

export class GoogleEarthEngineService {
  private initialized: boolean = false;
  constructor() {}

  // Initialize the Earth Engine API
  public async initialize() {
    console.log("Initializing Earth Engine...");
    // Initialization logic here
    this.initialized = true;
    console.log("Earth Engine initialized");
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  // Load a Landsat 8 image for a specific area and date range
  public async loadLandsatImage(
    geometry: ee.Geometry.Rectangle | ee.Geometry.Point,
    startDate: string,
    endDate: string
  ): Promise<ee.Image> {
    if (!this.initialized) {
      throw new Error("Earth Engine not initialized. Call initialize() first.");
    }
    console.log(geometry, startDate, endDate);

    // Create the Landsat 8 collection
    const collection = new ee.ImageCollection("COPERNICUS/S2_SR")
      .filterBounds(geometry)
      .filterDate(startDate, endDate)
      .sort("CLOUD_COVER");

    // Get the least cloudy image
    const image = collection.first();

    // Define visualization parameters for true color
    const visParams = {
      bands: ["B4", "B3", "B2"], // True color (RGB)
      min: 0,
      max: 0.3,
      gamma: 1.4
    };
    console.log(collection, image, visParams);

    return image.visualize(visParams);
  }

  // Convert Earth Engine image to map tile URL
  // public getMapTileUrl(image: ee.Image): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     image.getMap({}, (map: any) => {
  //       if (!map || !map.mapid) {
  //         reject(new Error("Failed to get map ID"));
  //         return;
  //       }

  //       const baseUrl = "https://earthengine.googleapis.com/map";
  //       const tileUrl = `${baseUrl}/{z}/{x}/{y}?token=${map.token}`;
  //       resolve(tileUrl);
  //     });
  //   });
  // }

  // // Add Landsat layer to MapLibre map
  // public async addToMapLibreMap(
  //   map: MapLibreMap,
  //   geometry: ee.Geometry.Rectangle | ee.Geometry.Point,
  //   startDate: string,
  //   endDate: string,
  //   layerId: string = "landsat-layer"
  // ): Promise<void> {
  //   const image = await this.loadLandsatImage(geometry, startDate, endDate);
  //   const tileUrl = await this.getMapTileUrl(image);

  //   // Remove existing layer and source if they exist
  //   if (map.getLayer(layerId)) {
  //     map.removeLayer(layerId);
  //   }
  //   if (map.getSource(layerId)) {
  //     map.removeSource(layerId);
  //   }

  //   // Add source and layer
  //   map.addSource(layerId, {
  //     type: "raster",
  //     tiles: [tileUrl],
  //     tileSize: 256,
  //     attribution: "Landsat 8 imagery courtesy of Google Earth Engine"
  //   });

  //   map.addLayer({
  //     id: layerId,
  //     type: "raster",
  //     source: layerId,
  //     paint: {
  //       "raster-opacity": 1,
  //       "raster-fade-duration": 0
  //     }
  //   });
  // }

  // Helper method to create a bounding box
  public static createBoundingBox(
    minLon: number,
    minLat: number,
    maxLon: number,
    maxLat: number
  ): ee.Geometry.Rectangle {
    return new ee.Geometry.Rectangle([
      [minLon, minLat],
      [maxLon, maxLat]
    ]);
  }

  // // Helper method to create a point
  // public static createPoint(lon: number, lat: number): ee.Geometry.Point {
  //   return ee.Geometry.Point([lon, lat]);
  // }
}
