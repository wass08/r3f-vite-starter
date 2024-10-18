import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { CameraHelper } from "three";

export function Test(props) {
  const { nodes, materials } = useGLTF("/LightTesting.glb");

  useEffect(() => {
    // Reset emissive materials
    Object.values(materials).forEach((material) => {
      if (material.emissive) material.emissive.set(0, 0, 0);
      material.emissiveIntensity = 1;
    });

    // Print the torch's geometry to the console
    console.log(
      "Torch Geometry:",
      nodes["New_World_(9)__18_110_-31_to_50_236_-6_13"].geometry
    );
  }, [materials, nodes]);

  const directionalLightRef = useRef();

  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new CameraHelper(
        directionalLightRef.current.shadow.camera
      );
      directionalLightRef.current.add(helper);
    }
  }, []);

  // Get torch bounding box center for light positioning
  const torchGeometry =
    nodes["New_World_(9)__18_110_-31_to_50_236_-6_13"].geometry;
  torchGeometry.computeBoundingBox();
  const torchCenter = torchGeometry.boundingBox.getCenter(new THREE.Vector3());

  return (
    <group {...props} dispose={null}>
      <group position={[0, 63, -0.5]}>
        <group position={[0, -63, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <ambientLight intensity={0.4} />

          {/* Improved Point Light */}
          <pointLight
            position={[torchCenter.x-1, torchCenter.y, torchCenter.z]} // Use torch center for positioning
            intensity={5} // Adjusted intensity
            color={"orange"}
            distance={100}
            decay={3} // Adjust decay to a more typical value
            castShadow
            shadow-mapSize-width={4096} // Higher resolution shadow map
            shadow-mapSize-height={4096} // Higher resolution shadow map
            shadow-bias={-0.001} // Adjust bias to prevent shadow acne
          />

          {/* Improved Directional Light */}
          {/* <directionalLight
            ref={directionalLightRef}
            color={"yellow"}
            castShadow
            position={[-110, 150, 33]}
            intensity={5} // Lower intensity for directional light
            shadow-mapSize-width={4096} // Higher resolution shadow map
            shadow-mapSize-height={4096} // Higher resolution shadow map
            shadow-camera-left={-1000}
            shadow-camera-right={1000}
            shadow-camera-top={1000}
            shadow-camera-bottom={-1000}
            shadow-camera-near={1}
            shadow-camera-far={1500}
            shadow-bias={-0.001} // Adjust bias to prevent shadow artifacts
          /> */}

          {/* Torch and Environment Geometry */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes["New_World_(9)__18_110_-31_to_50_236_-6"].geometry}
            material={materials.stone}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_1"].geometry
            }
            material={materials.grass_block_top}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_2"].geometry
            }
            material={materials.grass_block_side}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_3"].geometry
            }
            material={materials.snow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_4"].geometry
            }
            material={materials.grass_block_snow}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_5"].geometry
            }
            material={materials.dirt}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_6"].geometry
            }
            material={materials.spruce_sapling}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_7"].geometry
            }
            material={materials.iron_ore}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_8"].geometry
            }
            material={materials.coal_ore}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_9"].geometry
            }
            material={materials.spruce_log}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_10"].geometry
            }
            material={materials.spruce_log_top}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_11"].geometry
            }
            material={materials.spruce_leaves}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_12"].geometry
            }
            material={materials.grass}
          />
          <mesh
          
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_13"].geometry
            }
            material={materials.torch}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_14"].geometry
            }
            material={materials.tall_grass_bottom}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["New_World_(9)__18_110_-31_to_50_236_-6_15"].geometry
            }
            material={materials.tall_grass_top}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/LightTesting.glb");
