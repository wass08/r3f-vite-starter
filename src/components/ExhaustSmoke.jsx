import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ExhaustSmoke = ({ carRef }) => {
  const [smokeParticles, setSmokeParticles] = useState([]);
  const previousPosition = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!carRef.current) return;

    const carTranslation = carRef.current.translation();
    const carPosition = new THREE.Vector3(
      carTranslation.x+1.5,
      carTranslation.y-1 ,
      carTranslation.z+0.4
    );
    const carRotation = new THREE.Quaternion().copy(carRef.current.rotation());

    const carSpeed = carPosition.distanceTo(previousPosition.current) / delta;
    previousPosition.current.copy(carPosition);

    if (carSpeed < 1) { // Car is stationary
      const geometry = new THREE.SphereGeometry(0.5);
      const material = new THREE.MeshBasicMaterial({
        color: 0x666666, // Darker smoke color
        transparent: true,
        opacity: 0.7,
      });

      const offset = new THREE.Vector3(0, 0.3, -1.5); // Adjust offset to push smoke backward
      offset.applyQuaternion(carRotation);

      const smokeParticle = new THREE.Mesh(geometry, material.clone());
      smokeParticle.position.copy(carPosition).add(offset);
      smokeParticle.rotation.y = Math.random() * Math.PI * 2; // Randomize rotation
      smokeParticle.rotation.x = Math.random() * Math.PI * 2;
      smokeParticle.rotation.z = Math.random() * Math.PI * 2;
      setSmokeParticles((prev) => [
        ...prev
          .map((p) => {
            // p.material.opacity -= 0.02;
            p.rotation.y += 0.01; // Rotate particles to make them look like they are being pushed out
            p.rotation.x += 0.01;
            p.rotation.z += 0.01;
            return p;
          })
          .filter((p) => p.material.opacity > 0),
        smokeParticle,
      ]);
    } else {
      setSmokeParticles((prev) => [
        ...prev
          .map((p) => {
            p.material.opacity -= 0.02;
            p.rotation.y += 0.01;
            p.rotation.x += 0.01;
            p.rotation.z += 0.01;
            return p;
          })
          .filter((p) => p.material.opacity > 0),
      ]);
    }
  });

  return smokeParticles.map((particle, i) => (
    <primitive key={i} object={particle} />
  ));
};

export default ExhaustSmoke;