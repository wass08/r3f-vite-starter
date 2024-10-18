import Ring from "./Ring";
import { Canvas } from "@react-three/fiber";

export default function HUD() {
    return (
        <Canvas>
            <Ring/>
        </Canvas>
    );
}