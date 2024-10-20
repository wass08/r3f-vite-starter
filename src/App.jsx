import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei"; // Import Sphere
import React, { useState, useRef, useEffect } from "react";
import { Sphere, Box } from "@react-three/drei"; // Import Sphere from drei
import Model from "./assets/track/FullRaceTrackRaw";
import { Race } from "./assets/track/Racw";
import BackgroundMusic from "./components/BackgroundMusic";
import GameWithSound from "./components/GameWithSound";


// Main App
function App() {

  return (
    <Canvas shadows camera={{ position: [3, 3, 10], fov: 50 }}>
      <color attach="background" args={["#ececec"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Enable OrbitControls for camera movement */}
      <OrbitControls enableZoom={true} enableRotate={true} />

      {/* Add a cube */}
      <Box position={[0, 1, 0]} castShadow receiveShadow>
        <meshStandardMaterial attach="material" color="orange" />
        <GameWithSound />
      </Box>
        <Model />
        <Race />
     <BackgroundMusic />
    </Canvas>
  );
}

export default App;
