import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import './styles.css';
import Timer from './Timer';


export default function HUD({currentLap, maxLap, speed, mins, secs}) {

    return (
        <Canvas style={{ background: 'transparent', height: '100vh', zIndex:1 }}>
            <group position={[6.5,-3,0]}>
                <Speedometer speed={speed}/>
            </group>
            {/* <Text position={[-6.5,3.3,0]} color="black" fontSize={0.9} >
                {currentLap}/{maxLap}
            </Text>   */}
            {/* <Text position={[-5,3.5,0]} color="black" fontSize={0.3} >
                LAPS
            </Text> */}
            {/* <Text position={[4,3.5,0]} color="black" fontSize={0.3} >
                TIME
            </Text> */}
            <Html position={[5,3.5,0]}>
                <div className='bebas-neue-regular'>
                    TIME:
                </div>
            </Html>
            <Html position={[6,3.5,0]}>
                <div className='bebas-neue-regular'>
                    {mins}:
                </div>
            </Html>
        </Canvas>
    );
}