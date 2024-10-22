
import React, { useRef , useState, useEffect,Suspense } from "react";
import Nether from "./components/Nether";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Car";
import { RaceTrackWalls } from "./assets/track/Track1/CherryBlossomRawTrack";
import { Map } from "./assets/track/Track1/WholeMap";
import { Timer } from "./components/Timer";
import BackgroundMusic from "./components/BackgroundMusic";
import DustParticles from "./components/DustParticles/DustParticles";
import HUD from "./components/HUD";
import Loader from "./components/Loader"; // Import the Loader component

export default function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [carSpeed, setCarSpeed] = useState(0); // State for speed

  // Listen for arrow key presses
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
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

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
       <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "Black",
          fontSize: "44px",
          zIndex: 1, // Ensures it stays on top of the Canvas
        }}
      >
        <Timer startTimer={startTimer} />
      </div>
      <HUD speed={carSpeed} currentLap={3} maxLap={15}  /> {/* Pass speed to HUD */}
      <button onClick={() => handleGroupChange(1)}>Load Group 1</button>
      <button onClick={() => handleGroupChange(2)}>Load Group 2</button>

      {activeGroup == 1 && <Nether />}
      {activeGroup == 2 && (
        <Canvas
          shadows
          camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <Suspense fallback={<Loader />}>
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

            <Physics gravity={[0, -90.81, 0]} debug>
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
              {/* <SkidMarks carRef={carRef} /> */}
              <DustParticles carRef={carRef} />
            </Physics>
            <BackgroundMusic />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
