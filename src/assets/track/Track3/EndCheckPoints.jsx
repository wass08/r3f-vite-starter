import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function EndCheckPoints({ onCheckpointHit, ...props }) {
  const { nodes, materials } = useGLTF("/~scarhatt/EndCheckPoints.glb");
  Object.values(materials).forEach((material) => {
    material.transparent = true;
    material.opacity = 0;
  });

  // Handle collision event (for checkpoints)
  const handleCollision = (event) => {
    if (onCheckpointHit) {
      onCheckpointHit(event); // Increment counter on collision
    }
  };

  return (
    <group {...props} dispose={null} position={[-14, -40, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(1)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004"]
                .geometry
            }
            material={materials.white_concrete}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(2)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004_1"]
                .geometry
            }
            material={materials.black_concrete}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(3)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004_2"]
                .geometry
            }
            material={materials["white_concrete.003"]}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(4)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004_3"]
                .geometry
            }
            material={materials["black_concrete.003"]}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(5)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004_4"]
                .geometry
            }
            material={materials["white_concrete.001"]}
          />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="trimesh"
          sensor // This makes the collider a sensor (no obstruction)
          onCollisionEnter={() => onCheckpointHit(6)} // Trigger event on collision
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-328_20_98902_to_-143_319_99077004_5"]
                .geometry
            }
            material={materials["black_concrete.001"]}
          />
        </RigidBody>
      </group>
    </group>
  );
}

useGLTF.preload("/~scarhatt/EndCheckPoints.glb");
