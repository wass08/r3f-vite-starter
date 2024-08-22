import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import{useControls} from "leva"
import { Office } from "./office";

export const Experience = () => {
  return (
    <>
      <OrbitControls/>
      <Environment preset ="sunset"></Environment>
      <group position={-2}>
        <Office/>
      </group>
    </>
  );
};
