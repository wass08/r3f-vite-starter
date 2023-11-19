import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";

const App = () => {
  return (
    <>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={4} damping={0.1}>
          <Experience />
          <Scroll html>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default App;
