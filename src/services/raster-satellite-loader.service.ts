import * as ee from "@google/earthengine";
import { earthEngineConfigApiKey } from "../config/digitaltwin-unigis-5bcc81ac5e50";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export class RasterSatelliteLoaderService {
  private initialized = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private privateKey: any;

  // Load service account credentials
  constructor() {
    this.privateKey = earthEngineConfigApiKey;
  }

  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }

    try {
      await this.authenticateAndInitialize();
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Initialization failed:", error);
      throw error;
    }
  }

  private authenticateAndInitialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      ee.data.authenticateViaPrivateKey(
        this.privateKey,
        () => {
          ee.initialize(
            null,
            null,
            () => {
              console.log("Earth Engine initialized successfully");
              resolve();
            },
            (error: Error) => {
              console.error("Earth Engine initialization failed:", error);
              reject(error);
            }
          );
        },
        (error: Error) => {
          console.error("Authentication failed:", error);
          reject(error);
        }
      );
    });
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  //   private async initializeEarthEngine(): Promise<void> {
  //     try {
  //       // Initialize client library
  //       await ee.initialize({
  //         credentials: privateKey,
  //         onImmediateFailed: () => {
  //           // Handle initialization failure
  //           console.error("Earth Engine initialization failed");
  //         }
  //       });

  //       this.initialized = true;
  //       console.log("Earth Engine initialized successfully");
  //     } catch (error) {
  //       console.error("Error initializing Earth Engine:", error);
  //       throw error;
  //     }
  //   }
}
