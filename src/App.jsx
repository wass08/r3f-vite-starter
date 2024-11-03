import React, { useRef, useState, useEffect, Suspense, lazy } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Cars/Car";
import { Timer } from "./components/Timer";
import BackgroundMusic from "./components/BackgroundMusic";
import LeaderBoard from "./components/Leaderboard";
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
import { Nissan } from "./components/Cars/Nissan";
import PauseMenu from "./components/PauseMenu";
import StartMenu from "./components/StartMenu";
import { useProgress } from "@react-three/drei"; // For tracking loading progress
import SmokeEffect from "./components/SmokeEffect/SmokeEffect";
import LeafParticle from "./components/LeafParticle";
import Checkpoint from "./components/Checkpoint";
export default function App() {
  const [startTimer, setStartTimer] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state
  const [carSpeed, setCarSpeed] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Track if the game is paused
  const [activeGroup, setActiveGroup] = useState(null);
  const { progress } = useProgress(); // Hook to get loading progress
  const [carIndex, setCarIndex] = useState(1);
  const [checkpointCount, setCheckpointCount] = useState(0);
  const [shadows, setShadows] = useState(true);
  const [Fog, setFog] = useState(true);
  const [checkpointsHit, setCheckpointsHit] = useState(new Set());
  const [startGame, setStartGame] = useState(false); // Track if the game is started
  const handleStartGame = () => setStartGame(true); // Start the game
  const onCarIndex = (i) => setCarIndex(i);
  const [end, setEnd] = useState(false);

  const gameOver = () => {
    setEnd(false);
    setStartGame(false);
    setLaps(0);
    console.log("Game Over");
  };
  const carRef = useRef();
  const [Laps, setLaps] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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
  // Disable controls if paused
  const isControlDisabled = isPaused;
  // Listen for key presses, including Esc to toggle pause
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isControlDisabled) return; // Prevent controls if paused

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        setStartTimer(true); // Start the timer
        // setLaps(0);
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
  useEffect(() => {
    if (progress === 100 && loading) {
      setLoading(false); // Stop loading
      setStartGame(true); // Transition to game
    }
  }, [progress, loading]);
  const handleTrackSelect = (track) => {
    setActiveGroup(track); // Set the selected track
    setLoading(true); // Start loading process
  };
  

  return (
    <>
      {!startGame ? (
        <StartMenu
          onTrackSelect={handleTrackSelect}
          loading={loading}
          progress={progress}
          onCarSelect={onCarIndex}
        />
      ) : (
        <>
          {isPaused && (
            <PauseMenu
              setIsPaused={setIsPaused}
              setStartGame={setStartGame}
              setLaps={setLaps}
              setFog={setFog}
              setShadows={setShadows}
              Fog={Fog}
              shadows={shadows}
            />
          )}
          {end && (
            <LeaderBoard
              mapNum={activeGroup}
              time={totalTime}
              setEnd={gameOver}
              end={end}
            />
          )}
          <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <Suspense fallback={<Loader progress={progress} />}>
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
                <Timer
                  startTimer={startTimer}
                  Laps={Laps}
                  setTotalTime={setTotalTime}
                  IsPaused={isPaused}
                  end={end}

                />
              </div>
              <HUD
                speed={carSpeed}
                currentLap={Laps - 1}
                maxLap={activeGroup===1?2:activeGroup===2?3:4}
                setEnd={setEnd}
                setTimer={(i) => setStartTimer(i)}
                setLaps={setLaps}
              />

              <Canvas
                antialias="true"
                shadows
                camera={{
                  fov: 60,
                  near: 0.1,
                  far: 2000,
                  position: [0, 50, 200],
                }}
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                {/* <Timer/> */}
                {Fog && <fog attach="fog" color={color} near={1} far={far} />}
                {/* Add fog */}
                <ambientLight intensity={-2} />
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
                    <Environment files="  /Nether.jpg" background={true} />
                  </>
                )}
                {activeGroup == 3 && (
                  <>
                    <End />
                    <Environment files="  /space.jpg" background={true} />
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
                  {}
                  {carIndex == 1 && (
                    <Car
                      rigidBody={carRef}
                      onSpeedChange={setCarSpeed}
                      disabled={isPaused} // Disable car controls when paused
                      map={activeGroup}
                    />
                  )}
                  {carIndex == 2 && (
                    <Hummer
                      rigidBody={carRef}
                      onSpeedChange={setCarSpeed}
                      disabled={isPaused} // Disable car controls when paused
                    />
                  )}
                  {/* {carIndex == 3 && (
                    <NeonCar
                      rigidBody={carRef}
                      onSpeedChange={setCarSpeed}
                      disabled={isPaused} // Disable car controls when paused
                    />
                  )} */}
                  {carIndex == 3 && (
                    <Nissan
                      rigidBody={carRef}
                      onSpeedChange={setCarSpeed}
                      disabled={isPaused} // Disable car controls when paused
                    />
                  )}
                  <DustParticles carRef={carRef} carIndex={carIndex} />
                  <SmokeEffect
                    carRef={carRef}
                    timer={startTimer}
                    carIndex={carIndex}
                  />
                  <Checkpoint carRef={carRef} setLaps={setLaps} />
                  {/* <LeafParticle color={color} count={250} /> */}
                </Physics>

                <BackgroundMusic track={activeGroup} />
              </Canvas>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
