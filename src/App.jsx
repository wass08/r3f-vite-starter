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
import { Environment, Sky } from "@react-three/drei"; // Import Sky and Environment for HDR or skybox
import { Hummer } from "./components/Cars/Hummer";
import { NeonCar } from "./components/Cars/NeonCar";
import { Nissan } from "./components/Cars/Nissan";
import SmokeEffect from "./components/SmokeEffect/SmokeEffect";
import LeafParticle from "./components/LeafParticle";


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
    <>
      {/* Pause Menu Overlay */}
      {isPaused && !!activeGroup ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
            Game Paused
          </h1>

          <div style={{ marginBottom: "30px" }}>
            <h2>Controls</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>⬆️ Up Arrow: Accelerate</li>
              <li>⬇️ Down Arrow: Brake/Reverse</li>
              <li>➡️ Right Arrow: Turn Right</li>
              <li>⬅️ Left Arrow: Turn Left</li>
              <li>Space: Drift</li>
              <li>C: Change Camera View</li>
              <li>R: Restart from the begining</li>
            </ul>
          </div>

          <button
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              transition: "background-color 0.3s",
            }}
            onClick={() => setIsPaused(false)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Resume
          </button>

          <button
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "#f44336",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              transition: "background-color 0.3s",
            }}
            onClick={() => {
              setIsPaused(false);
              setActiveGroup(null);
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e53935")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            Main Menu
          </button>

          <button
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "#2196F3",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              transition: "background-color 0.3s",
            }}
            onClick={() => setShadows(!shadows)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e88e5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2196F3")}
          >
            Toggle Shadows
          </button>
          <button
            style={{
              padding: "12px 24px",
              fontSize: "20px",
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "#2196F3",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              transition: "background-color 0.3s",
            }}
            onClick={() => setFog(!Fog)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e88e5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2196F3")}
          >
            Toggle Fog
          </button>
          <style>
            {`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}
          </style>
        </div>
      ) : null}

      {!activeGroup ? (
        <div>
          <button
            onClick={() => setActiveGroup(1)}
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "Black",
              fontSize: "44px",
            }}
          >
            Load Group 1
          </button>
          <button
            onClick={() => setActiveGroup(2)}
            style={{
              position: "absolute",
              top: "20px",
              left: "320px",
              color: "Black",
              fontSize: "44px",
            }}
          >
            Load Group 2
          </button>
          <button
            onClick={() => setActiveGroup(3)}
            style={{
              position: "absolute",
              top: "20px",
              left: "620px",
              color: "Black",
              fontSize: "44px",
            }}
          >
            Load Group 3
          </button>
          <button
            onClick={() => setActiveGroup(4)}
            style={{
              position: "absolute",
              top: "20px",
              left: "920px",
              color: "Black",
              fontSize: "44px",
            }}
          >
            Load Group 4
          </button>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "Black",
              fontSize: "44px",
              zIndex: 1,
            }}
          >
            <Timer startTimer={startTimer} />
          </div>
          <HUD speed={carSpeed} currentLap={3} maxLap={15} />
          <h1
            style={{
              zIndex: 1,
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          >
            Checkpoints Hit: {checkpointCount}
          </h1>
          <Canvas
            shadows
            camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {Fog && <fog attach="fog" color={color} near={1} far={far} />}
            {/* Add fog */}
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={1} />
              <directionalLight
                color={lightColor}
                castShadow={shadows}
                position={[85, 150, 0]}
                intensity={10}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-1000}
                shadow-camera-right={1000}
                shadow-camera-top={1000}
                shadow-camera-bottom={-1000}
                shadow-camera-near={1}
                shadow-camera-far={1500}
                shadow-bias={-0.001}
              />
              {/* Skybox or Environment */}

              {/* Alternative: Basic sky using @react-three/drei */}

              {activeGroup == 1 && (
                <>
                  <CherryBlossom />
                  <Sky
                    sunPosition={[100, 10, 100]}
                    azimuth={0.25}
                    inclination={0.6}
                  />
                </>
              )}
              {activeGroup == 2 && (
                <>
                  <Nether />
                  <Environment files=" /Nether.jpg" background={true} />
                </>
              )}
              {activeGroup == 3 && (
                <>
                  <End />
                  <Environment files=" /space.jpg" background={true} />
                </>
              )}
              {activeGroup == 4 && null}

              <Physics gravity={[0, -90.81, 0]} paused={isPaused}>
                {activeGroup == 1 && <CherryBlossomRawTrack />}
                {activeGroup == 2 && <NetherRawTrack />}
                {activeGroup == 3 && <EndRawTrack />}
                {activeGroup == 4 && null}
                <RigidBody type="fixed" position={[0, 0, 0]}>
                  <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                  >
                    <planeGeometry args={[1000, 1000]} />
                    <meshStandardMaterial
                      color="green"
                      transparent
                      opacity={0}
                    />
                  </mesh>
                </RigidBody>

                {/* <Car
                  rigidBody={carRef}
                  onSpeedChange={setCarSpeed}
                  disabled={isPaused} // Disable car controls when paused
                /> */}
                <Hummer
                  rigidBody={carRef}
                  onSpeedChange={setCarSpeed}
                  disabled={isPaused} // Disable car controls when paused
                />
                {/* <NeonCar
                  rigidBody={carRef}
                  onSpeedChange={setCarSpeed}
                  disabled={isPaused} // Disable car controls when paused
                /> */}
                {/* <Nissan
                  rigidBody={carRef}
                  onSpeedChange={setCarSpeed}
                  disabled={isPaused} // Disable car controls when paused
                /> */}

                <DustParticles carRef={carRef} />
                {/* {console.log( carRef.current.rotation())} */}
                <SmokeEffect carRef={carRef} timer={startTimer}/>
                <LeafParticle count={100}/>
              </Physics>

              <BackgroundMusic />
            </Suspense>
          </Canvas>
        </div>
      )}
    </>
  );
}
