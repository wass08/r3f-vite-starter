import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";


export default function HUD({currentLap, maxLap, speed, currentTime,setEnd,setLaps}) {

    if(currentLap===maxLap){
        setEnd(true);
        setLaps(1);
    }

    return (
        <Canvas style={{ background: 'transparent', height: '100vh', zIndex:1 }}>
            <group position={[6.5,-3,0]}>
                <Speedometer speed={speed}/>
            </group>
            <Text position={[-6.5,3.3,0]} color="black" fontSize={0.9} >
                {currentLap}/{maxLap}
            </Text>  
            <Text position={[-5,3.5,0]} color="black" fontSize={0.3} >
                LAPS
            </Text>
            {/* <Text position={[4,3.5,0]} color="black" fontSize={0.3} >
                TIME
            </Text> */}
            <Text position={[6,3.3,0]} color="black" fontSize={0.9} >
                {currentTime}
            </Text> 

        </Canvas>

    );
}