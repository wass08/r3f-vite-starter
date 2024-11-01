// LeafParticle.js

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LeafParticle = ({ color = '#3A5F0B', count = 50 }) => {
  const particlesRef = useRef([]);

  // Set up positions and velocities for each particle
  const initialPositions = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 10,
    y: Math.random() * 5 + 5,
    z: (Math.random() - 0.5) * 10,
  }));

  const velocities = Array.from({ length: count }, () => ({
    y: -(Math.random() * 0.02 + 0.01),
  }));

  useEffect(() => {
    particlesRef.current = particlesRef.current.slice(0, count);
  }, [count]);

  useFrame(() => {
    particlesRef.current.forEach((cube, i) => {
      if (!cube) return;

      // Update position based on velocity
      cube.position.y += velocities[i].y;

      // Reset position if particle falls below certain Y
      if (cube.position.y < -2) {
        cube.position.y = initialPositions[i].y;
      }
    });
  });

  return (
    <group>
      {initialPositions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          position={[pos.x, pos.y, pos.z]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};

export default LeafParticle;
