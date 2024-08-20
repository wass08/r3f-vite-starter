import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import{useControls} from "leva"

export const Experience = () => {

  const {animations} =  useControls({
    animations:{

    
    value:"Typing",
    options: ["Typing", "Falling", "Standing"]
    },
  })
  return (
    <>
      <OrbitControls/>
      <Sky/>
      <Environment preset ="sunset"></Environment>
      <group position-y={-1}>
      <Avatar animations = {animations}/>

      {animations === "Typing" &&(
        <mesh scale = {[0.8,0.5,0.8]} position-y = {0.25} >
        <boxGeometry/>
        <meshStandardMaterial color = "white"/>
      </mesh>

      )}
      
      <mesh scale={5} rotation-x = {Math.PI * 0.5}>
        <planeGeometry/>
        <meshStandardMaterial color ="white" />
      </mesh>
      </group>
    </>
  );
};
