import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import{useControls} from "leva"
import { Office } from "./office";

export const Experience = () => {
  return (
    <>
      
      <Environment preset ="dawn"></Environment>
      <group position={-1}>
        <Office/>
      </group>
    </>
  );
};
