import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Snowing } from "./components/Snowing.jsx";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import { Snowfall } from "./components/Snowflake.jsx";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { Avatar } from "./components/Avatar";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

studio.initialize();
studio.extend(extension);

function App() {
  return (
    <Canvas className="canvas">
      <SheetProvider sheet={demoSheet}>
        <color attach="background" args={["#000"]} />
        <perspectiveCamera
          fov={75}
          aspect={sizes.width / sizes.height}
          position={[0, 0, 3]}
          near={0.1}
          far={100}
        >
          <Avatar position={[0, -3, 5]} scale={2} />
          <Stars />
          {/* <e.pointLight theatreKey="Light" position={[10, 10, 10]} /> */}
          <Environment preset="sunset" />
          {/* <Snowfall /> */}
          {/* <Experience /> */}
        </perspectiveCamera>
        <ambientLight />
        <OrbitControls />
      </SheetProvider>
    </Canvas>
  );
}

export default App;
