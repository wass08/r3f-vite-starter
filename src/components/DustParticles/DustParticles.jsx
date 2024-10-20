// DustParticles.js
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DustParticles = ({ carRef }) => {
  const [dustParticles, setDustParticles] = useState([]);
  const previousPosition = useRef(new THREE.Vector3()); // To calculate speed

  useFrame((_, delta) => {
    const { current: car } = carRef;

    if (car) {
      // Calculate car speed based on position change
      const carSpeed = car.position.distanceTo(previousPosition.current) / delta;
      previousPosition.current.copy(car.position);

      if (carSpeed > 7) { 
        const geometry = new THREE.SphereGeometry(0.7);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.1,
        });

        // Create two particles with slight positional offsets
        const particle1 = new THREE.Mesh(geometry, material.clone());
        const particle2 = new THREE.Mesh(geometry, material.clone());

        // Position the particles behind the car with slight left/right offset
        particle1.position.set(car.position.x - 0.0, car.position.y, car.position.z - 1.5);
        particle1.rotation.x = -Math.PI / 2.5;
        particle1.rotation.z = car.rotation.y;
        particle2.position.set(car.position.x + 0.0, car.position.y, car.position.z - 1.5);
        particle2.rotation.x = -Math.PI / 2.5;
        particle2.rotation.z = car.rotation.y;
        // Add new particles to the state, fade existing ones, and remove fully transparent particles
        setDustParticles((prev) => [
          ...prev
            .map((p) => {
              p.material.opacity -= 0.008; 
              return p;
            })
            .filter((p) => p.material.opacity > 0), 
          particle1,
          particle2,
        ]);
      } else {
        setDustParticles((prev) => [
          ...prev
            .map((p) => {
              p.material.opacity -= 0.009;
              return p;
            })
            .filter((p) => p.material.opacity > 0),
        ]);
      }
    }
  });

  // Render particles
  return dustParticles.map((particle, i) => <primitive key={i} object={particle} />);
};

export default DustParticles;
