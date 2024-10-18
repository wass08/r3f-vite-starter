import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";

export default function HUD() {
    return (
        <Canvas style={{ background: 'gray', height: '100vh' }}>
            <Speedometer speed={200}/>
        </Canvas>
    );
}