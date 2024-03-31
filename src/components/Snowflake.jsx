import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const Snowflake = ({ position, speed }) => {
  const meshRef = useRef();

  // Use the useFrame loop to update the snowflake's position
  useFrame(() => {
    if (meshRef.current.position.y < -5) {
      meshRef.current.position.y = 5;
      meshRef.current.position.x = position[0];
      meshRef.current.position.z = position[2];
    }
    meshRef.current.position.y -= speed;
  });

  return (
    <mesh position={position} ref={meshRef}>
      <sphereBufferGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export const Snowfall = ({ count = 100 }) => {
  const snowflakes = useMemo(() => {
    const flakes = [];
    for (let i = 0; i < count; i++) {
      flakes.push({
        position: [Math.random() * 10 - 5, Math.random() * 10, Math.random() * 10 - 5],
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return flakes;
  }, [count]);

  return (
    <>
      {snowflakes.map((flake, index) => (
        <Snowflake key={index} position={flake.position} speed={flake.speed} />
      ))}
    </>
  );
};