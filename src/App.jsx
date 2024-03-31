import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import {Snowing} from "./components/Snowing.jsx";
import {OrbitControls, Stars} from "@react-three/drei";
import {Snowfall} from "./components/Snowflake.jsx";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

function App() {
  return (
      <Canvas className="canvas">
          <color attach="background" args={["#000"]} />
          <perspectiveCamera
            fov={75}
            aspect={sizes.width / sizes.height}
            position={[0, 0, 3]}
            near={0.1}
            far={100}
          >
            <Snowfall />
              <Experience />
          </perspectiveCamera>
          <ambientLight />
          <OrbitControls />
    </Canvas>
    // <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
    //   <color attach="background" args={["#ececec"]} />
    //   <Experience />
    // </Canvas>
  );
}

export default App;
