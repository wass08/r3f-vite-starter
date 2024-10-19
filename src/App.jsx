import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei"; // Import Sphere
import React, { useState, useRef, useEffect } from "react";
import { Sphere, Box } from "@react-three/drei"; // Import Sphere from drei
import Model from "./assets/track/FullRaceTrackRaw";
import { Race } from "./assets/track/Racw";
import HUD from "./components/HUD";


// Main App
function App() {

  return (
    <HUD speed={200} currentLap={3} maxLap={15} currentTime={120.33} />
    
  );
}

export default App;
