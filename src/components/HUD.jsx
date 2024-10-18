import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function HUD() {
    return (
        <Canvas style={{ background: 'black', height: '100vh' }}>
            <Speedometer speed={200}/>  
        </Canvas>
    );
}