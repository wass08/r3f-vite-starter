
// import React, { useEffect } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { RigidBody } from "@react-three/rapier";
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three'; // Import THREE for quaternion and vector calculations
// import { PerspectiveCamera } from '@react-three/drei';
// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = React.useRef();
  
//   const [keys, setKeys] = React.useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false
//   });

  

//   const FORCE = 100;
//   const TURN = 10;
  
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowUp') setKeys(keys => ({ ...keys, forward: true }));
//       if (e.key === 'ArrowDown') setKeys(keys => ({ ...keys, backward: true }));
//       if (e.key === 'ArrowLeft') setKeys(keys => ({ ...keys, left: true }));
//       if (e.key === 'ArrowRight') setKeys(keys => ({ ...keys, right: true }));
//     };
    
//     const handleKeyUp = (e) => {
//       if (e.key === 'ArrowUp') setKeys(keys => ({ ...keys, forward: false }));
//       if (e.key === 'ArrowDown') setKeys(keys => ({ ...keys, backward: false }));
//       if (e.key === 'ArrowLeft') setKeys(keys => ({ ...keys, left: false }));
//       if (e.key === 'ArrowRight') setKeys(keys => ({ ...keys, right: false }));
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   useFrame(() => {
//     if (!rigidBody.current) return;

//     // Get the current quaternion (rotation) of the car
//     const quaternion = rigidBody.current.rotation(); // Quaternion-based rotation
//     const direction = new THREE.Vector3(0, -1, 0); // Forward direction (Z axis in local space)
    
//     // Apply the car's rotation to the forward vector
//     direction.applyQuaternion(quaternion);

//     // Forward/Backward in local space
//     if (keys.forward) {
//       rigidBody.current.applyImpulse(
//         { 
//           x: direction.x  * FORCE, 
//           y: 0, 
//           z: direction.z * FORCE 
//         },
//         true
//       );
//     }

//     if (keys.backward) {
//       rigidBody.current.applyImpulse(
//         { 
//           x: -direction.x * FORCE, 
//           y: 0, 
//           z: -direction.z * FORCE 
//         },
//         true
//       );
//     }

//     // Left/Right relative to car's current orientation
//     if (keys.left) {
//       rigidBody.current.applyTorqueImpulse(
//         { x: 0, y: TURN, z: 0 },
//         true
//       );
//     }

//     if (keys.right) {
//       rigidBody.current.applyTorqueImpulse(
//         { x: 0, y: -TURN, z: 0 },
//         true
//       );
//     }
//   });

//   return (
//     <group {...props} dispose={null}>

      
//       <RigidBody 
//         ref={rigidBody}
//         type="dynamic"
//         colliders="hull"
//         position={[0, 0, 0]}
//         mass={1}
//         rotation={[0,Math.PI/2,Math.PI/2]}
//         linearDamping={0.5}
//         angularDamping={0.8}
//         scale={[0.5,0.5,0.5]}
//       >
//         <group rotation={[0, Math.PI/2, 0]}> {/* Rotate the model to match movement direction */}
//           <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} />
//           <mesh geometry={nodes.Punto_GT_1.geometry} material={materials['Material_1']} />
//           <mesh geometry={nodes.Punto_GT_2.geometry} material={materials['Material_2']} />
//           <mesh geometry={nodes.Punto_GT_3.geometry} material={materials['Material_3']} />
//           <mesh geometry={nodes.Punto_GT_4.geometry} material={materials['Material_4']} />
//           <mesh geometry={nodes.Punto_GT_5.geometry} material={materials['Material_5']} />
//           <mesh geometry={nodes.Punto_GT_6.geometry} material={materials['Material_6']} />
//           <mesh geometry={nodes.Punto_GT_7.geometry} material={materials['Material_7']} />
//         </group>
//       </RigidBody>
//     </group>
//   );
// }

// useGLTF.preload('/Car.glb');
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Car(props) {
  const { nodes, materials } = useGLTF('/Car.glb');
  const rigidBody = useRef();
  const cameraRef = useRef(); // Ref to store the camera
  
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const FORCE = 25;
  const TURN = 4;
  const maxSpeed = 0.8;
  let carSpeed = 0;

  // Handling keypress events for movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: true }));
      if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: true }));
      if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
      if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: false }));
      if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: false }));
      if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
      if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Frame loop to handle car movement and camera following
  useFrame((state) => {
    if (!rigidBody.current) return;

    // Get the current quaternion (rotation) of the car
    const quaternion = rigidBody.current.rotation();
    const direction = new THREE.Vector3(0, -1, 0); // Forward direction in car space

    // Apply the car's rotation to the forward vector
    direction.applyQuaternion(quaternion);

    // Apply forward/backward movement
    if (keys.forward) {
      carSpeed = Math.min(carSpeed + 0.01, maxSpeed);
      rigidBody.current.applyImpulse(
        { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
        true
      );
    } else if (keys.backward) {
      carSpeed = Math.max(carSpeed - 0.01, -maxSpeed);
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

    // Adjust camera to follow the car
    const carPosition = rigidBody.current.translation();
    const carRotation = rigidBody.current.rotation();

    // Set camera position behind the car
    const cameraOffset = new THREE.Vector3(1.5, 6.5, 0).applyQuaternion(carRotation); // Offset relative to car rotation
    state.camera.position.set(
      carPosition.x + cameraOffset.x,
      carPosition.y+cameraOffset.y,
       carPosition.z+cameraOffset.z
    );

    state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
  });

  return (
    <group {...props} dispose={null}>
      <RigidBody
        ref={rigidBody}
        type="dynamic"
        colliders="hull"
        position={[10, 0, 0]}
        mass={1}
        rotation={[0, Math.PI / 2, Math.PI / 2]}
        linearDamping={0.5}
        angularDamping={0.8}
        scale={[0.4, 0.4, 0.4]}
      >
        <group rotation={[0, Math.PI / 2, 0]}>
          <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} />
          <mesh geometry={nodes.Punto_GT_1.geometry} material={materials['Material_1']} />
          <mesh geometry={nodes.Punto_GT_2.geometry} material={materials['Material_2']} />
          <mesh geometry={nodes.Punto_GT_3.geometry} material={materials['Material_3']} />
          <mesh geometry={nodes.Punto_GT_4.geometry} material={materials['Material_4']} />
          <mesh geometry={nodes.Punto_GT_5.geometry} material={materials['Material_5']} />
          <mesh geometry={nodes.Punto_GT_6.geometry} material={materials['Material_6']} />
          <mesh geometry={nodes.Punto_GT_7.geometry} material={materials['Material_7']} />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/Car.glb');
