import { CherryBlossomRawTrack } from "../assets/track/Track1/CherryBlossomRawTrack";
import { NetherRawTrack } from "../assets/track/Track2/NetherRawTrack";
import { EndRawTrack } from "../assets/track/Track3/EndRawTrack";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Hummer } from "./Cars/Hummer";
import { useGLTF } from "@react-three/drei";


export default function MiniMap({mapNum, props}) {
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
      </group>
    );
  }
  
  useGLTF.preload("/CherryBlossomRawTrack.glb");