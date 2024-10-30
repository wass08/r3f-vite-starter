import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import './styles.css';
import { Timer } from './Timer';


export default function HUD({currentLap, maxLap, speed, startTimer}) {
    let modLap = currentLap
    if (maxLap > 10 && currentLap < 10) {
        modLap = '0'.concat(modLap.toString());
    }

    return (
        <Canvas style={{ background: 'transparent', height: '100vh', zIndex:1 }}>
            <group position={[6.5,-3,0]}>
                <Speedometer speed={speed}/>
            </group>
            <Timer startTimer={startTimer} />
            {/*
            <Html position={[-7.26,3.5,0]}>
                <div className='bebas-neue-regular'>
                    LAPS
                </div>
            </Html>
            <Html position={[-6.26,3.5,0]}>
                <div className='bebas-neue-regular'>
                    {modLap}/{maxLap}
                </div>
            </Html>
            */}
        </Canvas>
    );
}