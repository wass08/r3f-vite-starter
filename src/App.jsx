import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import React, { Suspense } from "react";
import { ContactShadows, Environment } from "@react-three/drei";

function App() {
  return (
    <Canvas shadows camera={{ position: [1, 0, 1], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
      <axesHelper />
      <gridHelper />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={3} far={4} />
    </Canvas>
  );
}

export default App;
