import { Environment, OrbitControls, PresentationControls } from "@react-three/drei";
import React from "react";
import { Model } from "./Model";

export const Experience = () => {
  return (
    <>
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[0, 0]}
        zoom={2}
        azimuth={[-Math.PI, Math.PI]}
      >
        <Model />
      </PresentationControls>
    </>
  );
};
