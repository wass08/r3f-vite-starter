

import React from "react";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Car";
import { RaceTrackWalls } from "./assets/track/Track1/CherryBlossomRawTrack";
import { Map } from "./assets/track/Track1/WholeMap";

// Main App Component
export default function App() {
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

      <Physics gravity={[0, -50.81, 0]}  >
        {/* Race track and ground */}

        <RaceTrackWalls />

        {/* Ground plane */}
        <RigidBody type="fixed" position={[0, 0, 0]} >
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
        <Car />
      </Physics>
    </Canvas>
  );
}
