// import React, { useRef, useEffect, useState } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import Boost from './Boost';

// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = useRef();

//   const Boostarray=[
//     [0,1,0],
//     [20,1,0],
//     [30,1,0],
//     [60,1,0],

//   ]

//   const [keys, setKeys] = useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//     space:false,
//   });

//   const [boostActive, setBoostActive] = useState(false);
//   const [boostTimer, setBoostTimer] = useState(0);

//   const FORCE = boostActive ? 50 : 25; // Increase force when boost is active

//   let TURN = boostActive ? 4 : 2;
//   const maxSpeed = 0.8;
//   let carSpeed = 0;

//   // Handling keypress events for movement
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: true }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: true }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: true }));

//     };

//     const handleKeyUp = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: false }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: false }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: false }));

//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   // Frame loop to handle car movement and camera following
//   useFrame((state, delta) => {
//     if (!rigidBody.current) return;

//     // Get the current quaternion (rotation) of the car
//     const quaternion = rigidBody.current.rotation();
//     const direction = new THREE.Vector3(0, -1, 0); // Forward direction in car space

//     // Apply the car's rotation to the forward vector
//     direction.applyQuaternion(quaternion);

//     // Apply forward/backward movement
//     if (keys.forward) {
//       carSpeed = Math.min(carSpeed + 0.01, maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
//         true
//       );
//     } else if (keys.backward) {
//       carSpeed = Math.max(carSpeed - 0.01, -maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: -direction.x * FORCE, y: 0, z: -direction.z * FORCE },
//         true
//       );
//     }

//     // Apply turning torque
//     if (keys.left) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: TURN, z: 0 }, true);
//     }
//     if (keys.right) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: -TURN, z: 0 }, true);
//     }
//     if(keys.space){
//       TURN=20;
//     }
//     console.log(TURN);

//     // Check proximity to boost
//     const carPosition = rigidBody.current.translation();
//     Boostarray.forEach((boost)=>{

//       const boostPosition = new THREE.Vector3(boost[0], boost[1], boost[2]); // Boost position, adjust if needed
//       // console.log(carPosition);

//       const distanceToBoost = boostPosition.distanceTo(carPosition)

//       if (distanceToBoost < 2 && !boostActive) {
//         setBoostActive(true);
//         setBoostTimer(5); // Boost lasts 5 seconds
//       }

//       // Boost timer countdown
//       if (boostActive && boostTimer > 0) {
//         setBoostTimer(boostTimer - delta);
//       } else if (boostTimer <= 0) {
//         setBoostActive(false); // Deactivate boost when timer runs out
//       }
//     })

//     // Adjust camera to follow the car
//     const carRotation = rigidBody.current.rotation();
//     const cameraOffset = new THREE.Vector3(1.5, 6.5, 0).applyQuaternion(carRotation); // Offset relative to car rotation
//     // state.camera.position.set(
//     //   carPosition.x + cameraOffset.x,
//     //   carPosition.y + cameraOffset.y,
//     //   carPosition.z + cameraOffset.z
//     // );

//     // state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
//   });

//   return (
//     <>
//       <group {...props} dispose={null}>
//         <RigidBody
//           ref={rigidBody}
//           type="dynamic"
//           colliders="hull"
//           position={[10, 0, 0]}
//           mass={1}
//           rotation={[0, Math.PI / 2, Math.PI / 2]}
//           linearDamping={0.5}
//           angularDamping={0.8}
//           scale={[0.4, 0.4, 0.4]}
//         >
//           <group rotation={[0, Math.PI / 2, 0]}>
//             <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_1.geometry} material={materials['Material_1']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_2.geometry} material={materials['Material_2']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_3.geometry} material={materials['Material_3']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_4.geometry} material={materials['Material_4']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_5.geometry} material={materials['Material_5']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_6.geometry} material={materials['Material_6']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_7.geometry} material={materials['Material_7']} receiveShadow />
//           </group>
//         </RigidBody>
//       </group>

//       <Boost  />
//     </>
//   );
// }

// useGLTF.preload('/Car.glb');

/////////////////////////////////////////////////////

// import React, { useRef, useEffect, useState } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import Boost from './Boost';

// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = useRef();
//   const [keys, setKeys] = useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//     space: false,
//   });

//   const [boostActive, setBoostActive] = useState(false);
//   const [boostTimer, setBoostTimer] = useState(0);

//   const FORCE = boostActive ? 50 : 25; // Increase force when boost is active
//   let TURN = boostActive ? 4 : 2;
//   const maxSpeed = 0.8;
//   let carSpeed = 0;

//   const Boostarray = [
//     [0, 1, 0],
//     [20, 1, 0],
//     [30, 1, 0],
//     [60, 1, 0],
//   ];

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: true }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: true }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: true }));
//     };

//     const handleKeyUp = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: false }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: false }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: false }));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   // Boost timer management
//   useEffect(() => {
//     if (boostActive && boostTimer > 0) {
//       const timer = setInterval(() => {
//         setBoostTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }

//     if (boostTimer <= 0) {
//       setBoostActive(false); // Deactivate boost when timer runs out
//     }
//   }, [boostActive, boostTimer]);

//   // Frame loop to handle car movement and camera following
//   useFrame((state, delta) => {
//     if (!rigidBody.current) return;

//     const quaternion = rigidBody.current.rotation();
//     const direction = new THREE.Vector3(0, -1, 0);
//     direction.applyQuaternion(quaternion);

//     // Forward/backward movement
//     if (keys.forward) {
//       carSpeed = Math.min(carSpeed + 0.01, maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
//         true
//       );
//     } else if (keys.backward) {
//       carSpeed = Math.max(carSpeed - 0.01, -maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: -direction.x * FORCE, y: 0, z: -direction.z * FORCE },
//         true
//       );
//     }

//     // Apply turning torque with speed influence
//     const turnRate = TURN * (carSpeed / maxSpeed);
//     if (keys.left) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: turnRate, z: 0 }, true);
//     }
//     if (keys.right) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: -turnRate, z: 0 }, true);
//     }

//     // Boost proximity detection
//     const carPosition = rigidBody.current.translation();
//     Boostarray.forEach((boost) => {
//       const boostPosition = new THREE.Vector3(boost[0], boost[1], boost[2]);
//       const distanceToBoost = boostPosition.distanceTo(carPosition);

//       if (distanceToBoost < 2 && !boostActive) {
//         setBoostActive(true);
//         setBoostTimer(5); // Boost lasts 5 seconds
//       }
//     });

//     // Camera follow logic with lerp for smooth motion
//     const carRotation = rigidBody.current.rotation();
//     const cameraOffset = new THREE.Vector3(1.5, 6.5, 0).applyQuaternion(carRotation);
//     const targetPosition = new THREE.Vector3(
//       carPosition.x + cameraOffset.x,
//       carPosition.y + cameraOffset.y,
//       carPosition.z + cameraOffset.z
//     );
//     state.camera.position.lerp(targetPosition, 0.05); // Smoothly interpolate
//     state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
//   });

//   return (
//     <>
//       <group {...props} dispose={null}>
//         <RigidBody
//           ref={rigidBody}
//           type="dynamic"
//           colliders="hull"
//           position={[10, 0, 0]}
//           mass={1}
//           rotation={[0, Math.PI / 2, Math.PI / 2]}
//           linearDamping={0.5}
//           angularDamping={0.8}
//           scale={[0.4, 0.4, 0.4]}
//         >
//           <group rotation={[0, Math.PI / 2, 0]}>
//             {/* Car mesh */}
//           </group>
//         </RigidBody>
//       </group>
//       <Boost />
//     </>
//   );
// }

// useGLTF.preload('/Car.glb');

// Car.jsx
// import React, { useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';

// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = useRef();  // Car's rigid body ref

//   useFrame(() => {
//     if (!rigidBody.current) return;
//     // Handle car movement logic here...
//   });

//   return (
//     <RigidBody ref={rigidBody} {...props} type="dynamic">
//       {/* Car 3D model */}
//       <group rotation={[0, Math.PI / 2, 0]} dispose={null}>
//         <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} />
//         {/* Other car parts */}
//       </group>
//     </RigidBody>
//   );
// }

// useGLTF.preload('/Car.glb');

// import React, { useRef, useEffect, useState } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import Boost from './Boost';
// import { FirstPersonCamera } from './FirstPersonCamera';

// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = useRef();

//   const Boostarray = [
//     [0, 1, 0],
//     [20, 1, 0],
//     [30, 1, 0],
//     [60, 1, 0],
//   ];

//   const [keys, setKeys] = useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//     space: false,
//   });

//   const [boostActive, setBoostActive] = useState(false);
//   const [boostTimer, setBoostTimer] = useState(0);

//   const FORCE = boostActive ? 50 : 25;
//   let TURN = boostActive ? 4 : 2;
//   const maxSpeed = 0.8;
//   let carSpeed = 0;

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: true }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: true }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: true }));
//     };

//     const handleKeyUp = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: false }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: false }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: false }));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   useFrame((state, delta) => {
//     if (!rigidBody.current) return;

//     const quaternion = rigidBody.current.rotation();
//     const direction = new THREE.Vector3(0, -1, 0);
//     direction.applyQuaternion(quaternion);

//     if (keys.forward) {
//       carSpeed = Math.min(carSpeed + 0.01, maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
//         true
//       );
//     } else if (keys.backward) {
//       carSpeed = Math.max(carSpeed - 0.01, -maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: -direction.x * FORCE, y: 0, z: -direction.z * FORCE },
//         true
//       );
//     }

//     if (keys.left) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: TURN, z: 0 }, true);
//     }
//     if (keys.right) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: -TURN, z: 0 }, true);
//     }
//     if (keys.space) {
//       TURN = 20;
//     }

//     const carPosition = rigidBody.current.translation();
//     Boostarray.forEach((boost) => {
//       const boostPosition = new THREE.Vector3(boost[0], boost[1], boost[2]);
//       const distanceToBoost = boostPosition.distanceTo(carPosition);

//       if (distanceToBoost < 2 && !boostActive) {
//         setBoostActive(true);
//         setBoostTimer(5);
//       }

//       if (boostActive && boostTimer > 0) {
//         setBoostTimer(boostTimer - delta);
//       } else if (boostTimer <= 0) {
//         setBoostActive(false);
//       }
//     });
//   });

//   return (
//     <>
//       <group {...props} dispose={null}>
//         <RigidBody
//           ref={rigidBody}
//           type="dynamic"
//           colliders="hull"
//           position={[10, 0, 0]}
//           mass={1}
//           rotation={[0, Math.PI / 2, Math.PI / 2]}
//           linearDamping={0.5}
//           angularDamping={0.8}
//           scale={[0.4, 0.4, 0.4]}
//         >
//           <group rotation={[0, Math.PI / 2, 0]}>
//             <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_1.geometry} material={materials['Material_1']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_2.geometry} material={materials['Material_2']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_3.geometry} material={materials['Material_3']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_4.geometry} material={materials['Material_4']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_5.geometry} material={materials['Material_5']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_6.geometry} material={materials['Material_6']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_7.geometry} material={materials['Material_7']} receiveShadow />
//           </group>

//           {/* Add FirstPersonCamera as a child of the RigidBody */}
//           <FirstPersonCamera position={[0, 1, 0]} /> {/* Adjust position to be inside the car */}
//         </RigidBody>
//       </group>

//       <Boost />
//     </>
//   );
// }

// useGLTF.preload('/Car.glb');

////////////////////////////////

// import React, { useRef, useEffect, useState } from 'react';
// import { useGLTF, PerspectiveCamera } from '@react-three/drei';
// import { RigidBody } from '@react-three/rapier';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import Boost from './Boost';

// export function Car(props) {
//   const { nodes, materials } = useGLTF('/Car.glb');
//   const rigidBody = useRef();
//   const cameraRef = useRef();
//   const lookAtTarget = useRef(new THREE.Vector3()); // A point for the camera to look at

//   const Boostarray = [
//     [0, 1, 0],
//     [20, 1, 0],
//     [30, 1, 0],
//     [60, 1, 0],
//   ];

//   const [keys, setKeys] = useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//     space: false,
//   });

//   const [boostActive, setBoostActive] = useState(false);
//   const [boostTimer, setBoostTimer] = useState(0);

//   const FORCE = boostActive ? 50 : 25; // Increase force when boost is active
//   let TURN = boostActive ? 4 : 2;
//   const maxSpeed = 0.8;
//   let carSpeed = 0;

//   // Handling keypress events for movement
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: true }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: true }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: true }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: true }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: true }));
//     };

//     const handleKeyUp = (e) => {
//       if (e.key === 'ArrowUp') setKeys((keys) => ({ ...keys, forward: false }));
//       if (e.key === 'ArrowDown') setKeys((keys) => ({ ...keys, backward: false }));
//       if (e.key === 'ArrowLeft') setKeys((keys) => ({ ...keys, left: false }));
//       if (e.key === 'ArrowRight') setKeys((keys) => ({ ...keys, right: false }));
//       if (e.key === ' ') setKeys((keys) => ({ ...keys, space: false }));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   // Frame loop to handle car movement and camera following
//   useFrame((state, delta) => {
//     if (!rigidBody.current || !cameraRef.current) return;

//     // Get the current quaternion (rotation) of the car
//     const quaternion = rigidBody.current.rotation();
//     const direction = new THREE.Vector3(0, -1, 0); // Forward direction in car space

//     // Apply the car's rotation to the forward vector
//     direction.applyQuaternion(quaternion);

//     // Apply forward/backward movement
//     if (keys.forward) {
//       carSpeed = Math.min(carSpeed + 0.01, maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: direction.x * FORCE, y: 0, z: direction.z * FORCE },
//         true
//       );
//     } else if (keys.backward) {
//       carSpeed = Math.max(carSpeed - 0.01, -maxSpeed);
//       rigidBody.current.applyImpulse(
//         { x: -direction.x * FORCE, y: 0, z: -direction.z * FORCE },
//         true
//       );
//     }

//     // Apply turning torque
//     if (keys.left) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: TURN, z: 0 }, true);
//     }
//     if (keys.right) {
//       rigidBody.current.applyTorqueImpulse({ x: 0, y: -TURN, z: 0 }, true);
//     }
//     if (keys.space) {
//       TURN = 20;
//     }

//     // Check proximity to boost
//     const carPosition = rigidBody.current.translation();
//     Boostarray.forEach((boost) => {
//       const boostPosition = new THREE.Vector3(boost[0], boost[1], boost[2]); // Boost position, adjust if needed
//       const distanceToBoost = boostPosition.distanceTo(carPosition);

//       if (distanceToBoost < 2 && !boostActive) {
//         setBoostActive(true);
//         setBoostTimer(5); // Boost lasts 5 seconds
//       }

//       // Boost timer countdown
//       if (boostActive && boostTimer > 0) {
//         setBoostTimer(boostTimer - delta);
//       } else if (boostTimer <= 0) {
//         setBoostActive(false); // Deactivate boost when timer runs out
//       }
//     });

//     // Adjust camera to follow the car smoothly
//     const carRotation = rigidBody.current.rotation();
//     const cameraOffset = new THREE.Vector3(-6, 4, 0).applyQuaternion(carRotation); // Camera offset relative to the car's rotation
//     const targetPosition = new THREE.Vector3(
//       carPosition.x + cameraOffset.x,
//       carPosition.y + cameraOffset.y,
//       carPosition.z + cameraOffset.z
//     );

//     // Lerp camera position for smooth movement
//     cameraRef.current.position.lerp(targetPosition, delta * 3);

//     // Update camera to look at the car
//     lookAtTarget.current.lerp(carPosition, delta * 3);
//     cameraRef.current.lookAt(lookAtTarget.current);
//   });

//   return (
//     <>
//       <group {...props} dispose={null}>
//         <RigidBody
//           ref={rigidBody}
//           type="dynamic"
//           colliders="hull"
//           position={[10, 0, 0]}
//           mass={1}
//           rotation={[0, Math.PI / 2, Math.PI / 2]}
//           linearDamping={0.5}
//           angularDamping={0.8}
//           scale={[0.4, 0.4, 0.4]}
//         >
//           <group rotation={[0, Math.PI / 2, 0]}>
//             <mesh geometry={nodes.Punto_GT_0.geometry} material={materials['Material_0']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_1.geometry} material={materials['Material_1']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_2.geometry} material={materials['Material_2']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_3.geometry} material={materials['Material_3']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_4.geometry} material={materials['Material_4']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_5.geometry} material={materials['Material_5']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_6.geometry} material={materials['Material_6']} receiveShadow />
//             <mesh geometry={nodes.Punto_GT_7.geometry} material={materials['Material_7']} receiveShadow />
//           </group>
//         </RigidBody>
//       </group>

//       <Boost />

//       {/* Perspective camera that follows the car */}
//       <PerspectiveCamera
//         ref={cameraRef}
//         makeDefault
//         fov={75}
//         position={[0, 5, -10]}
//         near={0.1}
//         far={1000}
//       />
//     </>
//   );
// }

// useGLTF.preload('/Car.glb');

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Boost from "./Boost";

export function Car({props ,onPositionChange}) {
  const carRef = React.useRef();

  const { nodes, materials } = useGLTF("/Car.glb");
  const rigidBody = useRef();
  const cameraRef = useRef();
  const lookAtTarget = useRef(new THREE.Vector3()); // A point for the camera to look at

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
  });

  const [boostActive, setBoostActive] = useState(false);
  const [boostTimer, setBoostTimer] = useState(0);

  const FORCE = boostActive ? 50 : 25; // Increase force when boost is active
  let TURN = boostActive ? 4 : 2;
  const maxSpeed = 0.8;
  let carSpeed = 0;

  // Handling keypress events for movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") setKeys((keys) => ({ ...keys, forward: true }));
      if (e.key === "ArrowDown")
        setKeys((keys) => ({ ...keys, backward: true }));
      if (e.key === "ArrowLeft") setKeys((keys) => ({ ...keys, left: true }));
      if (e.key === "ArrowRight") setKeys((keys) => ({ ...keys, right: true }));
      if (e.key === " ") setKeys((keys) => ({ ...keys, space: true }));
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp") setKeys((keys) => ({ ...keys, forward: false }));
      if (e.key === "ArrowDown")
        setKeys((keys) => ({ ...keys, backward: false }));
      if (e.key === "ArrowLeft") setKeys((keys) => ({ ...keys, left: false }));
      if (e.key === "ArrowRight")
        setKeys((keys) => ({ ...keys, right: false }));
      if (e.key === " ") setKeys((keys) => ({ ...keys, space: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Frame loop to handle car movement and camera following
  useFrame((state, delta) => {
    if (!rigidBody.current || !cameraRef.current) return;

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
    if (keys.space) {
      TURN = 20;
    }

    // Check proximity to boost
    const carPosition = rigidBody.current.translation();
    onPositionChange(carPosition);
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
    const carRotation = rigidBody.current.rotation();
    const cameraOffset = new THREE.Vector3(2, 6, 0).applyQuaternion(
      carRotation
    ); // Camera offset relative to the car's rotation
    const targetPosition = new THREE.Vector3(
      carPosition.x + cameraOffset.x,
      carPosition.y + cameraOffset.y,
      carPosition.z + cameraOffset.z
    );

    // Lerp camera position for smooth movement
    cameraRef.current.position.lerp(targetPosition, delta * 10);

    // Update camera to look at the car
    lookAtTarget.current.lerp(carPosition, delta * 10);
    cameraRef.current.lookAt(lookAtTarget.current);
  });

  return (
    <>
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
            <mesh
              geometry={nodes.Punto_GT_0.geometry}
              material={materials["Material_0"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_1.geometry}
              material={materials["Material_1"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_2.geometry}
              material={materials["Material_2"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_3.geometry}
              material={materials["Material_3"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_4.geometry}
              material={materials["Material_4"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_5.geometry}
              material={materials["Material_5"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_6.geometry}
              material={materials["Material_6"]}
              receiveShadow
            />
            <mesh
              geometry={nodes.Punto_GT_7.geometry}
              material={materials["Material_7"]}
              receiveShadow
            />
          </group>
        </RigidBody>
      </group>

      <Boost />

      {/* Perspective camera that follows the car */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={75}
        position={[0, 5, -10]}
        near={0.1}
        far={1000}
      />
    </>
  );
}

useGLTF.preload("/Car.glb");
