import { CherryBlossomRawTrack } from "../assets/track/Track1/CherryBlossomRawTrack";
import { NetherRawTrack } from "../assets/track/Track2/NetherRawTrack";
import { EndRawTrack } from "../assets/track/Track3/EndRawTrack";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function MiniMap({mapNum}) {
    return (
        <Canvas>
            <CherryBlossomRawTrack />
            <OrbitControls/>
        </Canvas>
    );
}