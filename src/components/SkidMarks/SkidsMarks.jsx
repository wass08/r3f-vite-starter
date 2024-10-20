// SkidMarks.js
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SkidMarks = ({ carRef }) => {
  const [skidMeshes, setSkidMeshes] = useState([]);
  const previousRotationY = useRef(0);

  useFrame(() => {
    const { current: car } = carRef;
    if (!car) return;

    const rotationY = car.rotation.y;
    if (Math.abs(rotationY - previousRotationY.current) > 0.02) {
      // Add new skid mark on sharp turn

      const geometry = new THREE.PlaneGeometry(0.35, 0.6);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const skidMarkL = new THREE.Mesh(geometry, material);
      skidMarkL.position.set(car.position.x - 0.5, car.position.y, car.position.z - 0.5);
      skidMarkL.rotation.x = -Math.PI / 2.5;
      skidMarkL.rotation.z = car.rotation.y;
      setSkidMeshes((prev) => [...prev, skidMarkL]);

      const skidMarkR = new THREE.Mesh(geometry, material);
      skidMarkR.position.set(car.position.x + 0.5, car.position.y, car.position.z - 0.5);
      skidMarkR.rotation.x = -Math.PI / 2.5;
      skidMarkR.rotation.z = car.rotation.y;
      setSkidMeshes((prev) => [...prev, skidMarkR]);
    }

    previousRotationY.current = rotationY;
  });

  return skidMeshes.map((skid, index) => <primitive key={index} object={skid} />);
};

export default SkidMarks;
