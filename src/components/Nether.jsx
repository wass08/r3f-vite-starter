import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./Car";
import { Timer } from "./Timer";
import BackgroundMusic from "./BackgroundMusic";
import DustParticles from "./DustParticles/DustParticles";
import SkidMarks from "./SkidMarks/SkidsMarks";
import Loader from "./Loader"; // Import the Loader component
import { NetherRawTrackWalls } from "../assets/track/Track2/NetherRawTrack";
import { WholeNetherMap } from "../assets/track/Track2/WholeNetherMap";
import * as THREE from "three"; // Import THREE.js to define the fog

export default function Nether() {
  const [startTimer, setStartTimer] = useState(false);

  // Listen for arrow key presses
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        setStartTimer(true); // Start the timer when an arrow key is pressed
      }
      if (event.key === "r" || event.key === "R") {
        setStartTimer(false); // Reset the timer when "R" is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup event listener on unmount
    };
  }, []);

  const carRef = useRef();
  const [activeGroup, setActiveGroup] = useState(11);

  const handleGroupChange = (newGroup) => {
    setActiveGroup(newGroup);
  };
  const [carPosition, setCarPosition] = useState(null);

  const handleCarPosition = (position) => {
    if (
      position.x >= 0 &&
      position.x <= 50 &&
      position.z <= 25 &&
      position.z >= -75
    ) {
      // setActiveGroup(11);
    } else if (
      position.x < 72 &&
      position.x > 50 &&
      position.z < -75 &&
      position.z > -91
    ) {
      // setActiveGroup(10);
    } else {
      // setActiveGroup(8);
    }
  };

  // Fog setup component
  function SceneFog() {
    const { scene } = useThree();
    useEffect(() => {
      scene.fog = new THREE.Fog("#ff0000", 1, 1000); // Adjust fog density here
      return () => {
        scene.fog = null; // Cleanup fog on unmount
      };
    }, [scene]);

    return null;
  }

  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <SceneFog /> {/* Adding the fog component */}
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={1} />
        <directionalLight
          // castShadow
          color={"#fbe8fd"}
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

        <WholeNetherMap activeGroup={2} />

        <Physics gravity={[0, -90.81, 0]}>
          {/* Race track and ground */}
          <NetherRawTrackWalls />

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
          {/* <SkidMarks carRef={carRef} /> */}
          <DustParticles carRef={carRef} />
        </Physics>
        {/* <BackgroundMusic /> */}
      </Suspense>
    </Canvas>
  );
}
