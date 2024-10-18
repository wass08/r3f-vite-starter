import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { Race } from "./assets/track/Racw";
import { Vector3 } from "three";
import { Car } from "./components/Car";
import Model from "./assets/track/FullRaceTrackRaw";


// Main App Component
export default function App() {


  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[10, 20, 15]} intensity={1.5} />

      <Physics gravity={[0, -90.81, 0]} debug >
        {/* <Model></Model>
        <Race />  */}
        <RigidBody type="fixed" position={[0, 0, 0]}>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[400, 400]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>

        <Car/>

      </Physics>


      {/* OrbitControls */}
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}
