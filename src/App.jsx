import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";


function App() {
  return (
    <>
    <Canvas shadows camera={{ position: [-100, 100, 100], fov: 45}}>
      <color attach="background" args={["#0066dc"]} />
      <ScrollControls pages={5} damping={0.1}>
      <Experience />
      <Scroll html>
        <Interface/>
      </Scroll>
      </ScrollControls>
    </Canvas>
      </>
  );
}

export default App;
