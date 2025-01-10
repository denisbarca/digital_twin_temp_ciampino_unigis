import { ScenegraphLayer } from "@deck.gl/mesh-layers";
import { GLTFLoader } from "@loaders.gl/gltf";
import { CIAMPINO_CITY } from "../lib/utils";

const path3DCiampino = "../assets/ciampino_blosm_gltf_no_compr.gltf";

export const deckLayer = new ScenegraphLayer({
  id: "scenegraph-layer",
  data: [
    {
      position: [CIAMPINO_CITY.longitude, CIAMPINO_CITY.latitude], // Example coordinates
      scenegraph: path3DCiampino // Path to your GLTF file
    }
  ],
  scenegraph: path3DCiampino, // Path to your GLTF file
  loaders: [GLTFLoader], // Specify the loader
  getPosition: (d) => d.position,
  getColor: [255, 0, 0],
  sizeScale: 10,
  onDataLoad: () => {
    console.log("GLTF file loaded successfully");
  },
  onError: (error) => {
    console.error("Error loading GLTF file:", error);
  }
});

// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import maplibregl, { Map, CustomLayerInterface } from "maplibre-gl";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// interface ModelLayerOptions {
//   modelPath: string;
//   modelOrigin: [number, number]; // longitude, latitude
//   modelAltitude: number;
//   modelRotate: [number, number, number]; // x, y, z rotation in radians
//   modelScale: number;
//   modelFormat: "gltf" | "glb" | "obj";
// }

// export class ThreeJSModelLayer {
//   private camera: THREE.Camera;
//   private scene: THREE.Scene;
//   private renderer: THREE.WebGLRenderer;
//   private map: Map | undefined;
//   private modelTransform: {
//     translateX: number;
//     translateY: number;
//     translateZ: number;
//     rotateX: number;
//     rotateY: number;
//     rotateZ: number;
//     scale: number;
//   };

//   constructor(private options: ModelLayerOptions) {
//     this.camera = new THREE.Camera();
//     this.scene = new THREE.Scene();
//     this.renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true
//     });

//     // Model transform initialization
//     this.modelTransform = {
//       translateX: 0,
//       translateY: 0,
//       translateZ: 0,
//       rotateX: options.modelRotate[0],
//       rotateY: options.modelRotate[1],
//       rotateZ: options.modelRotate[2],
//       scale: options.modelScale
//     };
//   }

//   private async loadGLTF(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const loader = new GLTFLoader();
//       loader.load(
//         this.options.modelPath,
//         (gltf) => {
//           this.scene.add(gltf.scene);
//           resolve();
//         },
//         undefined,
//         reject
//       );
//     });
//   }

//   private async loadOBJ(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const loader = new OBJLoader();
//       loader.load(
//         this.options.modelPath,
//         (obj) => {
//           // Add default MeshStandardMaterial if no material is present
//           obj.traverse((child) => {
//             if (child instanceof THREE.Mesh) {
//               if (!child.material) {
//                 child.material = new THREE.MeshStandardMaterial({
//                   color: 0xcccccc
//                 });
//               }
//             }
//           });
//           this.scene.add(obj);
//           resolve();
//         },
//         undefined,
//         reject
//       );
//     });
//   }

//   async loadModel(): Promise<void> {
//     switch (this.options.modelFormat) {
//       case "gltf":
//       case "glb":
//         return this.loadGLTF();
//       case "obj":
//         return this.loadOBJ();
//       default:
//         throw new Error(
//           `Unsupported model format: ${this.options.modelFormat}`
//         );
//     }
//   }

//   createCustomLayer(layerId: string): CustomLayerInterface {
//     return {
//       id: layerId,
//       type: "custom",
//       renderingMode: "3d",
//       onAdd: (map: Map, _gl: WebGLRenderingContext) => {
//         this.map = map;
//         this.renderer.setSize(map.getCanvas().width, map.getCanvas().height);
//         this.renderer.autoClear = false;

//         // Add lights to the scene
//         const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//         this.scene.add(ambientLight);
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
//         directionalLight.position.set(0, -70, 100).normalize();
//         this.scene.add(directionalLight);

//         this.loadModel().catch(console.error);
//       },
//       render: (gl: WebGLRenderingContext, matrix: number[]) => {
//         if (!this.map) return;

//         const rotationX = new THREE.Matrix4().makeRotationAxis(
//           new THREE.Vector3(1, 0, 0),
//           this.modelTransform.rotateX
//         );
//         const rotationY = new THREE.Matrix4().makeRotationAxis(
//           new THREE.Vector3(0, 1, 0),
//           this.modelTransform.rotateY
//         );
//         const rotationZ = new THREE.Matrix4().makeRotationAxis(
//           new THREE.Vector3(0, 0, 1),
//           this.modelTransform.rotateZ
//         );

//         const m = new THREE.Matrix4().fromArray(matrix);
//         const l = new THREE.Matrix4()
//           .makeTranslation(
//             this.modelTransform.translateX,
//             this.modelTransform.translateY,
//             this.modelTransform.translateZ
//           )
//           .scale(
//             new THREE.Vector3(
//               this.modelTransform.scale,
//               -this.modelTransform.scale,
//               this.modelTransform.scale
//             )
//           )
//           .multiply(rotationX)
//           .multiply(rotationY)
//           .multiply(rotationZ);

//         if (matrix.length === 16) {
//           this.camera.projectionMatrix.elements = matrix as THREE.Matrix4Tuple;
//         }
//         this.camera.projectionMatrix = m.multiply(l);
//         this.renderer.state.reset();
//         this.renderer.render(this.scene, this.camera);
//       }
//     } as CustomLayerInterface;
//   }

//   updateModelPosition() {
//     if (!this.map) return;

//     const modelOrigin = this.options.modelOrigin;
//     const modelAltitude = this.options.modelAltitude;
//     const rotationX = this.options.modelRotate[0];
//     const rotationY = this.options.modelRotate[1];
//     const rotationZ = this.options.modelRotate[2];

//     const mercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
//       modelOrigin,
//       modelAltitude
//     );

//     this.modelTransform.translateX = mercatorCoordinate.x;
//     this.modelTransform.translateY = mercatorCoordinate.y;
//     this.modelTransform.translateZ = mercatorCoordinate.z;
//     this.modelTransform.rotateX = rotationX;
//     this.modelTransform.rotateY = rotationY;
//     this.modelTransform.rotateZ = rotationZ;
//   }
// }
