import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Interface } from "./components/Interface";
import { ScrollManager } from "./components/ScrollManager";
import { useState } from "react";
import { Nav } from "./components/Nav";


function App() {
  
  const   [section, setSection] = useState(0);
  
  const  [navOpened, setNavOpened] = useState(false);


  return (
    <>
    <Canvas shadows camera={{ position: [10, 5, -5], fov: 60}}>
      <color attach="background" args={["#FFE5B4"]} />
      <ScrollControls pages={5} damping={0.1}>
        <ScrollManager section = {section} onSectionChange ={setSection}/>
      <Experience />
      <Scroll html>
        <Interface/>
      </Scroll>
      </ScrollControls>
    </Canvas>
    <Nav onSectionChange = {setSection} navOpened = {navOpened} setNavOpened = {setNavOpened} />
      </>
  );
}

export default App;
