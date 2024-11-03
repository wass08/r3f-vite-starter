import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const SmokeParticle = ({ position, velocity, lifetime, timer, carIndex }) => {
  const ref = useRef();
  const animationFrameId = useRef();

  useEffect(() => {
    if (!timer) {
      if (ref.current) {
        if (carIndex === 1) {
          ref.current.position.set(position.x + 0.5, position.y, position.z);
        } else if (carIndex === 2) {
          ref.current.position.set(
            position.x - 0.1,
            position.y - 3.23,
            position.z
          );
        } else if (carIndex === 3) {
          ref.current.position.set(
            position.x - 0.9,
            position.y - 3,
            position.z + 0.1
          );
        }
      }

      const animate = () => {
        animationFrameId.current = requestAnimationFrame(animate);

        if (ref.current) {
          ref.current.position.x += velocity.x;
          ref.current.position.y += velocity.y;
          ref.current.position.z += velocity.z;

          ref.current.material.opacity -= 0.016;

          if (ref.current.material.opacity <= 0) {
            ref.current.visible = false;
            cancelAnimationFrame(animationFrameId.current);
          }
        }
      };

      animate();
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [position, velocity, timer]);

  if (timer) return null;

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial
        color={new THREE.Color(0x666666)}
        transparent
        opacity={lifetime / 1000}
      />
    </mesh>
  );
};

export default SmokeParticle;
