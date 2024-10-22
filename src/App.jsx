import React, { useState, Suspense } from "react";
import Nether from "./components/Nether";
import { Canvas } from "@react-three/fiber";
import { RigidBody, Physics } from "@react-three/rapier";
import { Car } from "./components/Car";
import { RaceTrackWalls } from "./assets/track/Track1/CherryBlossomRawTrack";
import { Map } from "./assets/track/Track1/WholeMap";
import Loader from "./components/Loader"; // Import the Loader component

// Main App Component
export default function App() {
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
    <>
      <button onClick={() => handleGroupChange(1)}>Load Group 1</button>
      <button onClick={() => handleGroupChange(2)}>Load Group 2</button>

      {activeGroup == 1 && <Nether />}
      {activeGroup == 2 && (
        <Canvas
          shadows
          camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
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

            <Physics gravity={[0, -50.81, 0]} debug>
              <RaceTrackWalls />

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

              <Car onPositionChange={handleCarPosition} />
            </Physics>
          </Suspense>
        </Canvas>
      )}
    </>
  );
}
