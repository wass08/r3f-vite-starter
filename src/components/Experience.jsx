import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import{useControls} from "leva"
import { Office } from "./office";

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
      <group position-1={-1}>
        <Office/>
      </group>
      
      <group  position={[34, 0.5, 1]} scale={15.559} rotation={[-Math.PI / 2, 1.5, 1.5]}>
      <Avatar animations = {animations}/>
      </group>
    </>
  );
};
