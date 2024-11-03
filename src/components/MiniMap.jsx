import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { OrthographicCamera, PerspectiveCamera, Circle } from "@react-three/drei";



export default function MiniMap({mapNum, props, x, y}) {

  


  if (mapNum == 1) {
    const { nodes, materials } = useGLTF("/CherryBlossomRawTrack.glb");
  
    return (
      <group {...props} dispose={null} position={[5, -76, 0]}>
        <group position={[-98, 0, -328]} rotation={[Math.PI / 2, 0, Math.PI]}>
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003"].geometry
            }
            material={materials.stone}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_1"].geometry
            }
            material={materials.polished_blackstone_bricks}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_2"].geometry
            }
            material={materials["polished_blackstone_bricks.006"]}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_3"].geometry
            }
            material={materials["polished_blackstone_bricks.003"]}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_4"].geometry
            }
            material={materials["polished_blackstone_bricks.001"]}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_5"].geometry
            }
            material={materials["polished_blackstone_bricks.002"]}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-168_10_385_to_-32_130_565003_6"].geometry
            }
            material={materials["polished_blackstone_bricks.007"]}
          />
        </group>
        <Circle args={[10, 64]} position={[0,1,0]}>
          <meshStandardMaterial emissive="green" />
        </Circle>
    </group>
    );
  }

  else if (mapNum == 2) {
    const { nodes, materials } = useGLTF("/NetherRawTrack.glb");

    return (
      <group {...props} dispose={null} position={[17, -140, 0]}>
        <group position={[255, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI]}>
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004"]
                .geometry
            }
            material={materials["polished_blackstone_bricks.005"]}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_1"]
                .geometry
            }
            material={materials.polished_blackstone_bricks}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_2"]
                .geometry
            }
            material={materials["polished_blackstone_bricks.002"]}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_3"]
                .geometry
            }
            material={materials["netherrack.002"]}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_4"]
                .geometry
            }
            material={materials["polished_blackstone_bricks.003"]}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_5"]
                .geometry
            }
            material={materials.basalt_side}
          />
          <mesh
            geometry={
              nodes["New_World_(8)__-386_-64_-1394_to_-287_126_-1261004_6"]
                .geometry
            }
            material={materials["polished_blackstone_bricks.004"]}
          />
        </group>
        <orthographicCamera ref={cameraRef} />
      </group>
      
    );
  }

  else if (mapNum == 3) {

    const { nodes, materials } = useGLTF("/EndRawTrack.glb");

    return (
      <group {...props} dispose={null}>
        <group
          // position={[-217, -35, 183]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <mesh
            geometry={
              nodes["New_World_(6)__-83_24_-120_to_65_319_156006"].geometry
            }
            material={materials["polished_blackstone_bricks.003"]}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-83_24_-120_to_65_319_156006_1"].geometry
            }
            material={materials.polished_blackstone_bricks}
          />
          <mesh
            geometry={
              nodes["New_World_(6)__-83_24_-120_to_65_319_156006_2"].geometry
            }
            material={materials["polished_blackstone_bricks.001"]}
          />
        </group>
      </group>
    );
  }
}


