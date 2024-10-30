import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Cars/Car";
import { Timer } from "./components/Timer";
import BackgroundMusic from "./components/BackgroundMusic";
import DustParticles from "./components/DustParticles/DustParticles";
import HUD from "./components/HUD";
import Loader from "./components/Loader"; // Import the Loader component
import { CherryBlossom } from "./assets/track/Track1/CherryBlossom";
import { Nether } from "./assets/track/Track2/Nether";
import { End } from "./assets/track/Track3/WholeEndMap";
import { CherryBlossomRawTrack } from "./assets/track/Track1/CherryBlossomRawTrack";
import { NetherRawTrack } from "./assets/track/Track2/NetherRawTrack";
import { EndRawTrack } from "./assets/track/Track3/EndRawTrack";
import { Environment, OrbitControls, Sky } from "@react-three/drei"; // Import Sky and Environment for HDR or skybox
import { Hummer } from "./components/Cars/Hummer";
import { NeonCar } from "./components/Cars/NeonCar";
import { Nissan } from "./components/Cars/Nissan";
import MiniMap from "./components/MiniMap";
import LeaderBoard from "./components/Leaderboard";

export default function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [carSpeed, setCarSpeed] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Track if the game is paused
  const [activeGroup, setActiveGroup] = useState(null);
  const carRef = useRef();
  const [checkpointCount, setCheckpointCount] = useState(0);
  const [shadows, setShadows] = useState(false);
  const [Fog, setFog] = useState(false);

  const [checkpointsHit, setCheckpointsHit] = useState(new Set());
  let far = 100;
  let color = "#fc4b4b";
  let lightColor = "#fc4b4b";
  if (activeGroup == 1) {
    far = 125;
    color = "#d691ca";
    lightColor = "#f8def4";
  } else if (activeGroup == 2) {
    far = 85;
    color = "#fc4b4b";
    lightColor = "#fc4b4b";
  } else if (activeGroup == 3) {
    far = 100;
    color = "#5a5151";
    lightColor = "#ffffff";
  }
  const handleCheckpointHit = (checkpointId) => {
    console.log(checkpointId);
    // if (!checkpointsHit.has(checkpointId)) {
    setCheckpointsHit((prev) => new Set([...prev, checkpointId]));
    setCheckpointCount((prev) => prev + 1);
    // }
  };

  // Disable controls if paused
  const isControlDisabled = isPaused;

  // Listen for key presses, including Esc to toggle pause
  useEffect(() => {
    console.log("shadows", shadows);
  }, [shadows]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isControlDisabled) return; // Prevent controls if paused

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        setStartTimer(true); // Start the timer
      }
      if (event.key === "r" || event.key === "R") {
        setStartTimer(false); // Reset the timer
      }
      if (event.key === "Escape") {
        setIsPaused((prev) => !prev); // Toggle pause state
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isControlDisabled]);

  return (
    <LeaderBoard />
  );
}
