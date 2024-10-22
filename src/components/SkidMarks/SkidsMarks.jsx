// SkidMarks.js
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SkidMarks = ({ carRef }) => {
  const [skidMeshes, setSkidMeshes] = useState([]);
  const previousRotationY = useRef(0);
  const previousPosition = useRef(new THREE.Vector3());

  useFrame((_,delta) => {
    const { current: car } = carRef;
    if (!car) return;

    const carPosition = car.translation();
    const carRotation = new THREE.Quaternion().copy(car.rotation());

    const tempPos = new THREE.Vector3(
      carPosition.x,
      carPosition.y,
      carPosition.z
    );

    const carSpeed = tempPos.distanceTo(previousPosition.current) / delta;
    previousPosition.current.copy(carPosition);

    const rotationY = car.rotation().y;
    if (Math.abs(rotationY - previousRotationY.current) > 0.001 && carSpeed > 5) {
    
      const geometry = new THREE.PlaneGeometry(0.4, 0.4);
      const material = new THREE.MeshBasicMaterial({
        color: 0xeeeeee,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });

      // Left skid mark off set (relative to the car)
      const offsetL = new THREE.Vector3(0.24, 0, -0.5); // Slight left behind the car
      const skidMarkL = new THREE.Mesh(geometry, material.clone());
      offsetL.applyQuaternion(carRotation); // Apply car's rotation to the left offset
      skidMarkL.position.set(
        carPosition.x + offsetL.x,
        carPosition.y + offsetL.y,
        carPosition.z + offsetL.z
      );
      skidMarkL.rotation.x = -Math.PI / 2; 
      // skidMarkL.rotation.z = rotationY; 

      // Right skid mark offset (relative to the car)
      const offsetR = new THREE.Vector3(0.24, 0, 0.5); // Slight right behind the car
      const skidMarkR = new THREE.Mesh(geometry, material.clone());
      offsetR.applyQuaternion(carRotation); // Apply car's rotation to the right offset
      skidMarkR.position.set(
        carPosition.x + offsetR.x,
        carPosition.y + offsetR.y,
        carPosition.z + offsetR.z
      );
      skidMarkR.rotation.x = -Math.PI / 2; // Flat on the ground
      // skidMarkR.rotation.z = rotationY; // Align with car's rotation
      setSkidMeshes((prev) => [...prev, skidMarkR, skidMarkL]);
  

    }

    // Update previous rotation
    previousRotationY.current = rotationY;
  });

  // Render the skid marks
  return skidMeshes.map((skid, index) => <primitive key={index} object={skid} />);
};

export default SkidMarks;
