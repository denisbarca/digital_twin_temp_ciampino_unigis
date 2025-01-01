import { ScenegraphLayer } from "deck.gl";

const path3DCiampino = "../assets/ciampino_blosm.obj";
// export const deckLayer = new SimpleMeshLayer({
//   id: "deck-gl-layer",
//   data: [
//     {
//       position: [CIAMPINO_CITY.longitude, CIAMPINO_CITY.latitude], // Example coordinates (Rome, Italy)
//       mesh: path3DCiampino // Path to your OBJ or GLTF file
//     }
//   ],
//   mesh: path3DCiampino, // Path to your OBJ or GLTF file
//   getPosition: (d) => d.position,
//   getColor: [255, 0, 0],
//   sizeScale: 10
// });

// Create ScenegraphLayer for 3D model
export const scenegraphLayer = new ScenegraphLayer({
  id: "3d-model",
  data: [
    {
      position: [-74.0066, 40.7135], // Model position (longitude, latitude)
      orientation: [0, 0, 0] // Rotation in radians [roll, pitch, yaw]
    }
  ],
  scenegraph: path3DCiampino, // Replace with your OBJ file path
  sizeScale: 50,
  getPosition: (d) => d.position,
  getOrientation: (d) => d.orientation,
  // Optionally add animations if your model supports them
  _animations: {
    "*": { speed: 1 }
  },
  parameters: {
    depthTest: true,
    depthWrite: true
  }
});
