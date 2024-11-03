// DustParticles.js
import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DustParticles = ({ carRef ,carIndex}) => {
  const [dustParticles, setDustParticles] = useState([]);
  const previousPosition = useRef(new THREE.Vector3()); // For speed calculations

  useFrame((_, delta) => {
    if (!carRef.current) return;

    // Get car's position and rotation using Rapier's translation and rotation methods
    const carTranslation = carRef.current.translation(); // Get car position from Rapier
    const carPosition = new THREE.Vector3(
      carTranslation.x,
      carTranslation.y,
      carTranslation.z
    );

    
    if (carIndex ===2 || carIndex === 3){
      carPosition.x -= 0.3
    }
    if (carIndex === 3) {
     carPosition.x -= 0.1
     carPosition.z += 1

    }
    const carRotation = new THREE.Quaternion().copy(carRef.current.rotation()); // Get car's rotation as a quaternion

    const carSpeed = carPosition.distanceTo(previousPosition.current) / delta;
    previousPosition.current.copy(carPosition);


    if (carSpeed > 7) {
      let geometry;
      if ( carIndex == 3){
        geometry = new THREE.SphereGeometry(0.2);
      }
      else if (carIndex == 2 ){ 
        geometry = new THREE.SphereGeometry(0.22);
      }else {
        geometry = new THREE.SphereGeometry(0.33);

      }
      const material = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.5,
      });

  
      const particle1 = new THREE.Mesh(geometry, material.clone());
      const particle2 = new THREE.Mesh(geometry, material.clone());

      const offset1 = new THREE.Vector3(0.1, 0, 0.5); 
      const offset2 = new THREE.Vector3(0.1, 0, -.5);
      
      if (carIndex == 2 || carIndex == 3) {
        offset1.z -= 0.2 
      }

    
      offset1.applyQuaternion(carRotation);
      offset2.applyQuaternion(carRotation);


      particle1.position.copy(carPosition).add(offset1);
      particle2.position.copy(carPosition).add(offset2);
      setDustParticles((prev) => [
        ...prev
          .map((p) => {
            p.material.opacity -= 0.03;
            return p;
          })
          .filter((p) => p.material.opacity > 0), // Remove particles that are fully faded
        particle1,
        particle2,
      ]);
    } else {
      setDustParticles((prev) => [
        ...prev
          .map((p) => {
            p.material.opacity -= 0.03;
            return p;
          })
          .filter((p) => p.material.opacity > 0), // Remove particles that are fully faded
      ]);
    }
  });

  return dustParticles.map((particle, i) => (
    <primitive key={i} object={particle} />
  ));
};

export default DustParticles;
