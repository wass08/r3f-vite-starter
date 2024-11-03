// MiniMap.js
import React, { useRef, useEffect } from "react";
import { OrthographicCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function MiniMap({ carRef }) {
  const miniMapCamera = useRef();

  // Follow the car's position in a top-down view
  useEffect(() => {
    if (!carRef.current || !miniMapCamera.current) return;

    const updateMiniMapPosition = () => {
      const { position } = carRef.current;
      miniMapCamera.current.position.set(position.x, position.y + 100, position.z);
      miniMapCamera.current.lookAt(position.x, position.y, position.z);
    };

    // Attach to render loop
    return useFrame(updateMiniMapPosition);
  }, [carRef]);

  return (
    <OrthographicCamera
      ref={miniMapCamera}
      makeDefault={false} // Ensures it doesn’t replace the main camera
      position={[0, 100, 0]} // Adjust height based on preference
      zoom={0.1} // Adjust zoom for desired view range
    />
  );
}
