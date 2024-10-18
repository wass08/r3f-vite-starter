import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { Race } from "./assets/track/Racw";
import { CameraHelper } from "three";

import { Vector3 } from "three";
import { BadLands } from "./assets/track/BadLandsWhole";
import { Cave } from "./assets/track/Cave_whole";
import { Test } from "./assets/track/LightTesting";

// TestCube Component with Movement
function TestCube() {
  const cubeRef = useRef();

  const handleKeyDown = (event) => {
    const force = 2;
    const direction = new Vector3(0, 0, 0);

    if (event.key === "ArrowUp") direction.z = -force;
    if (event.key === "ArrowDown") direction.z = force;
    if (event.key === "ArrowLeft") direction.x = -force;
    if (event.key === "ArrowRight") direction.x = force;

    if (cubeRef.current) {
      cubeRef.current.applyImpulse(direction, true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <RigidBody
      ref={cubeRef}
      colliders="cuboid"
      position={[0, 10, 0]}
      linearDamping={0.5}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}

// Main App Component
export default function App() {
  const cameraRef = useRef();
  const moveSpeed = 0.5;

  const handleKeyDown = (event) => {
    if (!cameraRef.current) return;
    const position = cameraRef.current.position;

    if (event.key === "w") position.z -= moveSpeed;
    if (event.key === "s") position.z += moveSpeed;
    if (event.key === "a") position.x -= moveSpeed;
    if (event.key === "d") position.x += moveSpeed;
    if (event.key === "Shift") position.y -= moveSpeed;
    if (event.key === " ") position.y += moveSpeed;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Gyro control for mobile devices
  useEffect(() => {
    const handleOrientation = (event) => {
      if (cameraRef.current) {
        const { alpha, beta, gamma } = event;
        cameraRef.current.rotation.set(
          (beta * Math.PI) / 180,
          (alpha * Math.PI) / 180,
          (gamma * Math.PI) / 180
        );
      }
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const directionalLightRef = useRef();

  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new CameraHelper(
        directionalLightRef.current.shadow.camera
      );
      directionalLightRef.current.add(helper);
    }
  }, []);

  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
    >
      {/* Ambient and Directional Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        color={"#b77228"}
        castShadow
        position={[110, 150, 33]}
        intensity={25}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
        shadow-camera-near={1}
        shadow-camera-far={1500}
        shadow-bias={-0.001}
      />

      {/* Physics Environment */}
      {/* <Physics gravity={[0, -9.81, 0]}>
        <Race />
        <TestCube />
      </Physics> */}
      {/* <group position={[20, 0, 95]} rotation={[0, Math.PI / 2, 0]}>
        <Test />
      </group> */}
      {/* Render Models */}
      <group position={[0, 0, -14]} frustumCulled>
        <BadLands />
        <Cave />
      </group>

      {/* Camera Configuration */}
      <perspectiveCamera ref={cameraRef} fov={35} position={[0, 10, 20]} />

      {/* Orbit Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        maxDistance={2000} // To prevent excessive zoom-out
        minDistance={5} // Prevents zooming in too far
      />
    </Canvas>
  );
}
