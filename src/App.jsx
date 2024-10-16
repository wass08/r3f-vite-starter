import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RigidBody, Physics } from "@react-three/rapier";
import { Race } from "./assets/track/Racw";
import { Vector3 } from "three";

// TestCube Component with Gentle Movement
function TestCube() {
  const cubeRef = useRef();

  // Function to handle key press events
  const handleKeyDown = (event) => {
    const force = 2; // Reduced force for gentler movement
    const direction = new Vector3(0, 0, 0); // Initialize the force vector

    if (event.key === "ArrowUp") {
      direction.z = -force; // Move forward
    } else if (event.key === "ArrowDown") {
      direction.z = force; // Move backward
    } else if (event.key === "ArrowLeft") {
      direction.x = -force; // Move left
    } else if (event.key === "ArrowRight") {
      direction.x = force; // Move right
    }

    // Apply the force to the cube's rigid body
    if (cubeRef.current) {
      cubeRef.current.applyImpulse(direction, true);
    }
  };

  // Add event listener for key presses when the component is mounted
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // Clean up
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
  const moveSpeed = 0.5; // Adjust camera movement speed

  // Handle camera movement
  const handleKeyDown = (event) => {
    if (!cameraRef.current) return;

    // Get the current camera position
    const position = cameraRef.current.position;

    switch (event.key) {
      case "w":
        position.z -= moveSpeed; // Move forward
        break;
      case "s":
        position.z += moveSpeed; // Move backward
        break;
      case "a":
        position.x -= moveSpeed; // Move left
        break;
      case "d":
        position.x += moveSpeed; // Move right
        break;
      case "Shift":
        position.y -= moveSpeed; // Move down
        break;
      case " ":
        position.y += moveSpeed; // Move up
        break;
      default:
        break;
    }
  };

  // Gyro Control Hook
  useEffect(() => {
    const handleOrientation = (event) => {
      if (cameraRef.current) {
        const { alpha, beta, gamma } = event;
        cameraRef.current.rotation.set(
          (beta * Math.PI) / 180, // Tilt up and down
          (alpha * Math.PI) / 180, // Rotate around vertical axis
          (gamma * Math.PI) / 180 // Tilt left and right
        );
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation); // Clean up
    };
  }, []);

  // Add event listener for key presses when the component is mounted
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // Clean up
  }, []);

  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[10, 20, 15]} intensity={1.5} />

      {/* Physics Environment */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* Set gravity here */}
        <Race /> {/* Race Track */}
        <TestCube /> {/* Test cube with movement */}
      </Physics>

      {/* Camera Control */}
      <perspectiveCamera ref={cameraRef} fov={35} position={[0, 10, 20]} />

      {/* OrbitControls */}
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}
