// // FirstPersonCamera.jsx
// import React, { useRef } from 'react';
// import { useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// const KEYS = {
//   'a': 'KeyA',
//   's': 'KeyS',
//   'w': 'KeyW',
//   'd': 'KeyD',
// };

// function clamp(x, a, b) {
//   return Math.min(Math.max(x, a), b);
// }

// const InputController = () => {
//   const [keys, setKeys] = React.useState({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//   });

//   const [mouse, setMouse] = React.useState({
//     x: 0,
//     y: 0,
//     xDelta: 0,
//     yDelta: 0,
//   });

//   // Handle keyboard input
//   React.useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === KEYS.w) setKeys((keys) => ({ ...keys, forward: true }));
//       if (e.code === KEYS.s) setKeys((keys) => ({ ...keys, backward: true }));
//       if (e.code === KEYS.a) setKeys((keys) => ({ ...keys, left: true }));
//       if (e.code === KEYS.d) setKeys((keys) => ({ ...keys, right: true }));
//     };

//     const handleKeyUp = (e) => {
//       if (e.code === KEYS.w) setKeys((keys) => ({ ...keys, forward: false }));
//       if (e.code === KEYS.s) setKeys((keys) => ({ ...keys, backward: false }));
//       if (e.code === KEYS.a) setKeys((keys) => ({ ...keys, left: false }));
//       if (e.code === KEYS.d) setKeys((keys) => ({ ...keys, right: false }));
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     window.addEventListener('keyup', handleKeyUp);
    
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       window.removeEventListener('keyup', handleKeyUp);
//     };
//   }, []);

//   // Handle mouse movement
//   React.useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouse((prev) => ({
//         x: e.pageX,
//         y: e.pageY,
//         xDelta: e.movementX,
//         yDelta: e.movementY,
//       }));
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return { keys, mouse };
// };

// const FirstPersonCamera = () => {
//   const { camera } = useThree();
//   const { keys, mouse } = InputController();

//   const rotation = useRef(new THREE.Quaternion());
//   const translation = useRef(new THREE.Vector3(0, 2, 0));
//   const phi = useRef(0);
//   const theta = useRef(0);

//   const phiSpeed = 8;
//   const thetaSpeed = 5;

//   useFrame((_, delta) => {
//     // Handle mouse rotation
//     const xh = mouse.xDelta / window.innerWidth;
//     const yh = mouse.yDelta / window.innerHeight;

//     phi.current += -xh * phiSpeed;
//     theta.current = clamp(theta.current + -yh * thetaSpeed, -Math.PI / 3, Math.PI / 3);

//     const qx = new THREE.Quaternion();
//     qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), phi.current);
//     const qz = new THREE.Quaternion();
//     qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), theta.current);

//     rotation.current.multiplyQuaternions(qx, qz);
//     camera.quaternion.copy(rotation.current);

//     // Handle movement
//     const forwardVelocity = (keys.forward ? 1 : 0) + (keys.backward ? -1 : 0);
//     const strafeVelocity = (keys.left ? 1 : 0) + (keys.right ? -1 : 0);

//     const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(qx).multiplyScalar(forwardVelocity * delta * 10);
//     const strafe = new THREE.Vector3(-1, 0, 0).applyQuaternion(qx).multiplyScalar(strafeVelocity * delta * 10);

//     translation.current.add(forward);
//     translation.current.add(strafe);
//     camera.position.copy(translation.current);
//   });

//   return null;
// };

// export default FirstPersonCamera;



// FirstPersonCamera.jsx
// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const FirstPersonCamera = ({ carRef }) => {
//   const cameraRef = useRef();
  
//   useFrame(() => {
//     if (!carRef.current) return;

//     const carPosition = carRef.current.translation();  // Get car position
//     const carRotation = carRef.current.rotation();     // Get car rotation

//     // Set camera position slightly forward and higher inside the car
//     cameraRef.current.position.set(
//       carPosition.x,
//       carPosition.y + 1.5,  // Adjust height for driver's perspective
//       carPosition.z - 1     // Adjust backward for better field of view
//     );

//     // Sync camera rotation with car's rotation
//     cameraRef.current.rotation.set(carRotation.x, carRotation.y, carRotation.z);
//   });

//   return <perspectiveCamera ref={cameraRef} fov={75} />;
// };

// export default FirstPersonCamera;



//best one so far...just jittery mpuse 
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const KEYS = {
  'a': 65,
  's': 83,
  'w': 87,
  'd': 68,
};

function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
}

export function FirstPersonCamera({ position = [0, 2, 0] }) {
  const { camera, gl } = useThree();
  const inputRef = useRef({
    mouseXDelta: 0,
    mouseYDelta: 0,
    mouseX: 0,
    mouseY: 0,
  });
  const rotationRef = useRef(new THREE.Quaternion());
  const translationRef = useRef(new THREE.Vector3(...position));
  const phiRef = useRef(0);
  const thetaRef = useRef(0);
  const keysRef = useRef({});

  const phiSpeed = 8;
  const thetaSpeed = 5;

  useEffect(() => {
    const handleMouseMove = (e) => {
      inputRef.current.mouseX = e.clientX - window.innerWidth / 2;
      inputRef.current.mouseY = e.clientY - window.innerHeight / 2;
      inputRef.current.mouseXDelta = e.movementX;
      inputRef.current.mouseYDelta = e.movementY;
    };

    const handleKeyDown = (e) => {
      keysRef.current[e.keyCode] = true;
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.keyCode] = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    updateRotation(delta);
    updateTranslation(delta);
    updateCamera();
  });

  const updateRotation = (timeElapsedS) => {
    const xh = inputRef.current.mouseXDelta / window.innerWidth;
    const yh = inputRef.current.mouseYDelta / window.innerHeight;

    phiRef.current += -xh * phiSpeed;
    thetaRef.current = clamp(thetaRef.current + -yh * thetaSpeed, -Math.PI / 3, Math.PI / 3);

    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), phiRef.current);
    const qz = new THREE.Quaternion();
    qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), thetaRef.current);

    const q = new THREE.Quaternion();
    q.multiply(qx);
    q.multiply(qz);

    rotationRef.current.copy(q);
  };

  const updateTranslation = (timeElapsedS) => {
    const forwardVelocity = (keysRef.current[KEYS.w] ? 1 : 0) + (keysRef.current[KEYS.s] ? -1 : 0);
    const strafeVelocity = (keysRef.current[KEYS.a] ? 1 : 0) + (keysRef.current[KEYS.d] ? -1 : 0);

    const qx = new THREE.Quaternion();
    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), phiRef.current);

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(qx);
    forward.multiplyScalar(forwardVelocity * timeElapsedS * 10);

    const left = new THREE.Vector3(-1, 0, 0);
    left.applyQuaternion(qx);
    left.multiplyScalar(strafeVelocity * timeElapsedS * 10);

    translationRef.current.add(forward);
    translationRef.current.add(left);
  };

  const updateCamera = () => {
    camera.quaternion.copy(rotationRef.current);
    camera.position.copy(translationRef.current);

    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(rotationRef.current);

    const dir = forward.clone();

    forward.multiplyScalar(100);
    forward.add(translationRef.current);

    camera.lookAt(forward);
  };

  return null;
}


// import React, { useRef, useEffect } from 'react';
// import { useThree, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const KEYS = {
//   'a': 65,
//   's': 83,
//   'w': 87,
//   'd': 68,
// };

// function clamp(x, a, b) {
//   return Math.min(Math.max(x, a), b);
// }

// export function FirstPersonCamera({ position = [0, 2, 0] }) {
//   const { camera, gl } = useThree();
//   const inputRef = useRef({
//     mouseXDelta: 0,
//     mouseYDelta: 0,
//     mouseX: 0,
//     mouseY: 0,
//   });
//   const rotationRef = useRef(new THREE.Quaternion());
//   const translationRef = useRef(new THREE.Vector3(...position));
//   const phiRef = useRef(0);
//   const thetaRef = useRef(0);
//   const keysRef = useRef({});

//   const phiSpeed = 0.002; // Reduced from 8
//   const thetaSpeed = 0.002; // Reduced from 5
//   const dampingFactor = 0.92; // New damping factor

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       inputRef.current.mouseXDelta += e.movementX;
//       inputRef.current.mouseYDelta += e.movementY;
//     };

//     const handleKeyDown = (e) => {
//       keysRef.current[e.keyCode] = true;
//     };

//     const handleKeyUp = (e) => {
//       keysRef.current[e.keyCode] = false;
//     };

//     gl.domElement.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('keydown', handleKeyDown);
//     document.addEventListener('keyup', handleKeyUp);

//     // Lock the pointer when the element is clicked
//     gl.domElement.addEventListener('click', () => {
//       gl.domElement.requestPointerLock();
//     });

//     return () => {
//       gl.domElement.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('keyup', handleKeyUp);
//     };
//   }, [gl]);

//   useFrame((_, delta) => {
//     updateRotation(delta);
//     updateTranslation(delta);
//     updateCamera();
//   });

//   const updateRotation = (timeElapsedS) => {
//     phiRef.current -= inputRef.current.mouseXDelta * phiSpeed;
//     thetaRef.current -= inputRef.current.mouseYDelta * thetaSpeed;
//     thetaRef.current = clamp(thetaRef.current, -Math.PI / 3, Math.PI / 3);

//     const qx = new THREE.Quaternion();
//     qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), phiRef.current);
//     const qz = new THREE.Quaternion();
//     qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), thetaRef.current);

//     const q = new THREE.Quaternion();
//     q.multiplyQuaternions(qx, qz);

//     rotationRef.current.slerp(q, 1 - Math.pow(dampingFactor, timeElapsedS));

//     inputRef.current.mouseXDelta = 0;
//     inputRef.current.mouseYDelta = 0;
//   };

//   const updateTranslation = (timeElapsedS) => {
//     const forwardVelocity = (keysRef.current[KEYS.w] ? 1 : 0) + (keysRef.current[KEYS.s] ? -1 : 0);
//     const strafeVelocity = (keysRef.current[KEYS.a] ? 1 : 0) + (keysRef.current[KEYS.d] ? -1 : 0);

//     const qx = new THREE.Quaternion();
//     qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), phiRef.current);

//     const forward = new THREE.Vector3(0, 0, -1);
//     forward.applyQuaternion(qx);
//     forward.multiplyScalar(forwardVelocity * timeElapsedS * 10);

//     const left = new THREE.Vector3(-1, 0, 0);
//     left.applyQuaternion(qx);
//     left.multiplyScalar(strafeVelocity * timeElapsedS * 10);

//     translationRef.current.add(forward);
//     translationRef.current.add(left);
//   };

//   const updateCamera = () => {
//     camera.quaternion.copy(rotationRef.current);
//     camera.position.copy(translationRef.current);

//     const forward = new THREE.Vector3(0, 0, -1);
//     forward.applyQuaternion(rotationRef.current);

//     forward.multiplyScalar(100);
//     forward.add(translationRef.current);

//     camera.lookAt(forward);
//   };

//   return null;
// }