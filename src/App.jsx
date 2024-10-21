// import React, { useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import { RigidBody, Physics } from "@react-three/rapier";
// import { Race } from "./assets/track/Racw";
// import { Vector3 } from "three";
// import { Car } from "./components/Car";
// import Model from "./assets/track/FullRaceTrackRaw";

// // Main App Component
// export default function App() {

//   return (
//     <Canvas shadows>
//       <ambientLight intensity={0.5} />
//       <directionalLight castShadow position={[10, 20, 15]} intensity={1.5} />

//       <Physics gravity={[0, -90.81, 0]} debug >
//         {/* <Model></Model>
//         <Race />  */}
//         <RigidBody type="fixed" position={[0, 0, 0]}>
//           <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//             <planeGeometry args={[400, 400]} />
//             <meshStandardMaterial color="green" />
//           </mesh>
//         </RigidBody>

//         <Car/>

//       </Physics>

//       {/* OrbitControls */}
//       <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
//     </Canvas>
//   );
// }

/////////////////////////////////////

// import React, { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Physics } from "@react-three/rapier";
// import { Car } from "./components/Car";
// import Model from "./assets/track/FullRaceTrackRaw";
// import { Race } from "./assets/track/Racw";

// // Main App Component
// export default function App() {
//   const carRef = useRef();

//   return (
//     <Canvas shadows>
//       <ambientLight intensity={0.5} />
//       <directionalLight castShadow position={[10, 20, 15]} intensity={1.5} />

//       <Physics gravity={[0, -9.81, 0]}>
//         {/* Uncomment these lines if you want to include the track models */}
//         {/* <Model /> */}
//         {/* <Race /> */}

//         {/* Ground plane */}
//         <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//           <planeGeometry args={[400, 400]} />
//           <meshStandardMaterial color="green" />
//         </mesh>

//         {/* Car component (includes FirstPersonCamera) */}
//         <Car ref={carRef} />
//       </Physics>
//     </Canvas>
//   );
// }

// import React, { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Physics, RigidBody } from "@react-three/rapier";
// import { Car } from "./components/Car";
// import Model from "./assets/track/FullRaceTrackRaw";
// import { Race } from "./assets/track/Racw";

// // Main App Component
// export default function App() {
//   const carRef = useRef();

//   return (
//     <Canvas shadows>
//       <ambientLight intensity={0.5} />
//       <directionalLight castShadow position={[10, 20, 15]} intensity={1.5} />

//       <Physics gravity={[0, -9.81, 0]}>
//         {/* Uncomment these lines if you want to include the track models */}
//         {/* <Model /> */}
//         {/* <Race /> */}

//         {/* Ground plane */}
//         <RigidBody type="fixed">
//           <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//             <planeGeometry args={[400, 400]} />
//             <meshStandardMaterial color="green" />
//           </mesh>
//         </RigidBody>

//         {/* Reference Blocks */}
//         <RigidBody type="fixed" position={[0, 1, 0]}>
//           <mesh castShadow>
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial color="red" />
//           </mesh>
//         </RigidBody>

//         <RigidBody type="fixed" position={[10, 1, 10]}>
//           <mesh castShadow>
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial color="blue" />
//           </mesh>
//         </RigidBody>

//         <RigidBody type="fixed" position={[-10, 1, -10]}>
//           <mesh castShadow>
//             <boxGeometry args={[2, 2, 2]} />
//             <meshStandardMaterial color="yellow" />
//           </mesh>
//         </RigidBody>

//         {/* Car component (includes FirstPersonCamera) */}
//         <Car ref={carRef} />
//       </Physics>
//     </Canvas>
//   );
// }

//////////////////////////////////

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Car";
import { RaceTrackWalls } from "./assets/track/Track1/CherryBlossomRawTrack";
import { Map } from "./assets/track/Track1/WholeMap";
import DustParticles from "./components/DustParticles/DustParticles";
import SkidMarks from "./components/SkidMarks/SkidsMarks";

// Main App Component
export default function App() {
  const carRef = useRef();

  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
    >
      {/* Ambient and Directional Lighting */}
      <ambientLight intensity={1} />
      <directionalLight
        color={"#fbe8fd"}
        castShadow
        position={[85, 75, 0]}
        intensity={10}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
        shadow-camera-near={1}
        shadow-camera-far={1500}
        shadow-bias={-0.001}
      />
      <Map />

      <Physics gravity={[0, -50.81, 0]} debug>
        {/* Race track and ground */}

        <RaceTrackWalls />

        {/* Ground plane */}
        <RigidBody type="fixed" position={[0, 0, 0]}>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
          >
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial
              color="green"
              transparent={true}
              opacity={0}
            />
          </mesh>
        </RigidBody>

        {/* Car component with built-in camera follow */}
        <Car rigidBody={carRef} />
        <SkidMarks carRef={carRef} />
        <DustParticles carRef={carRef} />
      </Physics>
    </Canvas>
  );
}
