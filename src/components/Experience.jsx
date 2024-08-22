import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { Office } from "./office";
import {motion} from "framer-motion-3d"

export const Experience = (props) => {


  const {section} = props;
  return (
    <>
      <Environment preset ="sunset"></Environment>
      <motion.group
        position = {[-1.5, -10,-2]}
        scale = {[0.9, 0.9, 0.9]}
        rotation-y = {-Math.PI / 4}
        animate = {{
          y : section == 0 ? 0 : -1,
        }}

        transition={{
          type: "spring",
          stiffness: 100,
        }}
        
        >

          <Office/>



        
      </motion.group>
    </>
  );
};
