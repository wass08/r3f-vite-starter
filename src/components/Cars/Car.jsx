import React, { useRef, useEffect, useState } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Boost from "../Boost";
import GameWithSound from "../GameWithSound";
import DustParticles from "../DustParticles/DustParticles";
import Speedometer from "../Speedometer";
import { getBaseUrl } from "../../utils/getURL";
import Checkpoint from "../Checkpoint";

export function Car({ rigidBody, onSpeedChange, ...props }) {
  const { nodes, materials } = useGLTF(`/~scarhatt/Car.glb`);
  // const rigidBody = useRef();
  const carRef=useRef();
  const cameraRef = useRef();
  const lookAtTarget = useRef(new THREE.Vector3()); // A point for the camera to look at
  const [isFirstPerson, setIsFirstPerson] = useState(false); // Toggle for camera mode
  

  const Boostarray = [
    [0, 1, 0],
    [20, 1, 0],
    [30, 1, 0],
    [60, 1, 0],
  ];

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
    reset: false, // New key state for reset
  });

  const [boostActive, setBoostActive] = useState(false);
  const [boostTimer, setBoostTimer] = useState(0);

  const FORCE = boostActive ? 13 : 50; // Increase force when boost is active
  let TURN = boostActive ? 1 : 3;
  const maxSpeed = 200;
  const [carSpeed, setCarSPeed] = useState(0);

  // Handling keypress events for movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") setKeys((keys) => ({ ...keys, forward: true }));
      if (e.key === "ArrowDown")
        setKeys((keys) => ({ ...keys, backward: true }));
      if (e.key === "ArrowLeft") setKeys((keys) => ({ ...keys, left: true }));
      if (e.key === "ArrowRight") setKeys((keys) => ({ ...keys, right: true }));
      if (e.key === " ") setKeys((keys) => ({ ...keys, space: true }));
      if (e.key === "r" || e.key === "R")
        setKeys((keys) => ({ ...keys, reset: true })); // Reset on 'R'
      if (e.key === "c") setIsFirstPerson((prev) => !prev); // Toggle camera mode on 'C' key press
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") setKeys((keys) => ({ ...keys, forward: false }));
      if (e.key === "ArrowDown")
        setKeys((keys) => ({ ...keys, backward: false }));
      if (e.key === "ArrowLeft") setKeys((keys) => ({ ...keys, left: false }));
      if (e.key === "ArrowRight")
        setKeys((keys) => ({ ...keys, right: false }));
      if (e.key === " ") setKeys((keys) => ({ ...keys, space: false }));
      if (e.key === "r" || e.key === "R")
        setKeys((keys) => ({ ...keys, reset: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Reset function to reset car's position, rotation, and speed
  const resetCar = () => {
    if (rigidBody.current) {
      rigidBody.current.setTranslation({ x: 10, y: 1, z: 0 }); // Reset position
      const uprightRotation = new THREE.Quaternion();
      uprightRotation.setFromEuler(
        new THREE.Euler(0, Math.PI / 2, Math.PI / 2)
      );

      rigidBody.current.setRotation(uprightRotation); // Reset to upright
      rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }); // Reset linear velocity
      rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }); // Reset angular velocity

      setCarSPeed(0);
      setBoostActive(false);
      setBoostTimer(0);
    }
  };

  // Frame loop to handle car movement and camera following
  useFrame((state, delta) => {
    if (!rigidBody.current || !cameraRef.current) return;

    // Call reset function if reset key is pressed
    if (keys.reset) {
      resetCar();
      return; // Skip further processing in this frame
    }

    // Get the current quaternion (rotation) of the car
    const quaternion = rigidBody.current.rotation();
    const direction = new THREE.Vector3(0, -1, 0); // Forward direction in car space

    // Apply the car's rotation to the forward vector
    direction.applyQuaternion(quaternion);

    // Apply forward/backward movement
    if (!keys.forward) {
      setCarSPeed(0);
    }
    if (keys.forward) {
      setCarSPeed(Math.min(carSpeed + 3, maxSpeed));
      rigidBody.current.applyImpulse(
        { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
        true
      );
    } else if (keys.backward) {
      setCarSPeed(Math.min(carSpeed + 3, maxSpeed));

      rigidBody.current.applyImpulse(
        { x: -direction.x * FORCE, y: 0, z: -direction.z * FORCE },
        true
      );
    }

    // Apply turning torque
    if (keys.left) {
      rigidBody.current.applyTorqueImpulse({ x: 0, y: TURN, z: 0 }, true);
    }
    if (keys.right) {
      rigidBody.current.applyTorqueImpulse({ x: 0, y: -TURN, z: 0 }, true);
    }
    if (keys.space) {
      TURN = 10;
    }
    if (onSpeedChange) {
      onSpeedChange(Math.min(carSpeed, maxSpeed)); // Pass the updated speed to App.jsx
    }

    // Check proximity to boost
    const carPosition = rigidBody.current.translation();
    Boostarray.forEach((boost) => {
      const boostPosition = new THREE.Vector3(boost[0], boost[1], boost[2]); // Boost position, adjust if needed
      const distanceToBoost = boostPosition.distanceTo(carPosition);

      if (distanceToBoost < 2 && !boostActive) {
        setBoostActive(true);
        setBoostTimer(5); // Boost lasts 5 seconds
      }

      // Boost timer countdown
      if (boostActive && boostTimer > 0) {
        setBoostTimer(boostTimer - delta);
      } else if (boostTimer <= 0) {
        setBoostActive(false); // Deactivate boost when timer runs out
      }
    });

    // Adjust camera to follow the car smoothly
    // const carRotation = rigidBody.current.rotation();
    // const cameraOffset = new THREE.Vector3(2, 6, 0).applyQuaternion(carRotation); // Camera offset relative to the car's rotation
    // const targetPosition = new THREE.Vector3(
    //   carPosition.x + cameraOffset.x,
    //   carPosition.y + cameraOffset.y,
    //   carPosition.z + cameraOffset.z
    // );

    // // Lerp camera position for smooth movement
    // cameraRef.current.position.lerp(targetPosition, delta * 10);

    // // Update camera to look at the car
    // lookAtTarget.current.lerp(carPosition, delta * 10);
    // cameraRef.current.lookAt(lookAtTarget.current);

    if (isFirstPerson) {
      // Set the camera's position to be near the car's bonnet
      cameraRef.current.position.set(
        carPosition.x,
        carPosition.y + 1.1,
        carPosition.z - 1
      );

      // Get the car's quaternion (rotation)
      const carQuaternion = rigidBody.current.rotation(); // Get the car's quaternion rotation
      cameraRef.current.quaternion.copy(carQuaternion); // Update the camera's quaternion to match the car's rotation

      // Define a direction to look at (adjust these values to change the camera's facing position)
      const lookAtOffset = new THREE.Vector3(1.5, -9, -0.5); // Forward direction relative to the car
      lookAtOffset.applyQuaternion(carQuaternion); // Rotate the look-at offset by the car's rotation

      // Calculate the target position for the camera to look at
      const targetPosition = cameraRef.current.position
        .clone()
        .add(lookAtOffset);

      // Make the camera look at the calculated target position
      cameraRef.current.lookAt(targetPosition);
    } else {
      // Third-person camera behind and above the car
      const carRotation = rigidBody.current.rotation();
      const cameraOffset = new THREE.Vector3(2, 4, 0).applyQuaternion(
        carRotation
      ); // Camera offset relative to the car's rotation
      const targetPosition = new THREE.Vector3(
        carPosition.x + cameraOffset.x,
        carPosition.y + cameraOffset.y,
        carPosition.z + cameraOffset.z
      );

      cameraRef.current.position.lerp(targetPosition, delta * 10);

      lookAtTarget.current.lerp(carPosition, delta * 10);
      cameraRef.current.lookAt(lookAtTarget.current);
    }
  });

  return (
    <>
      <group {...props} dispose={null}>
        <RigidBody
          ref={rigidBody}
          type="dynamic"
          colliders="hull"
          position={[10, 0, 0]} // Initial position
          mass={20}
          rotation={[0, Math.PI / 2, Math.PI / 2]} // Initial rotation
          linearDamping={0.5}
          // angularDamping={0.8}
          scale={[0.4, 0.4, 0.4]}
        >
          <group rotation={[0, Math.PI / 2, 0]}>
            <mesh
              geometry={nodes.Punto_GT_0.geometry}
              material={materials.gt_black}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_1.geometry}
              material={materials.gt_license}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_2.geometry}
              material={materials.gt_tire}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_3.geometry}
              material={materials.gt_rim}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_4.geometry}
              material={materials.gt_windows}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_5.geometry}
              material={materials["Hemi.001"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_6.geometry}
              material={materials.gt_body}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_7.geometry}
              material={materials.gt_details}
              receiveShadow
            />
          </group>
        </RigidBody>
        <GameWithSound />
        {/* <Speedometer speed={maxSpeed} /> */}
      </group>

      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        position={[0, 5, -10]}
        near={0.1}
        far={85}
      />
      
      {/* <Boost Boostarray={Boostarray} /> */}
    </>
  );
}

useGLTF.preload(`/~scarhatt/Car.glb`);
