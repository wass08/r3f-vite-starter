import { Line, Text, Circle } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo } from 'react';

export default function Ring({speed}) {

    const points = useMemo(() => {
        const radius = 1;
        const segments = 70;
        let theta = -Math.PI / 6;
        const angleStep = (Math.PI * 4/3) / segments;
        const pts = [];
        const numPos = [];
        const whiteCirc = [];
        const redCirc = [];
        for (let i = 0; i <= segments; i++) {
          pts.push([Math.cos(theta) * radius, Math.sin(theta) * radius, 0]);
          if (i%10 == 0) {
            pts.push([
                Math.cos(theta) * (radius - 0.1), 
                Math.sin(theta) * (radius - 0.1),
                0,
            ]);
            numPos.push([
                Math.cos(theta) * (radius - 0.2), 
                Math.sin(theta) * (radius - 0.2),
                0,
            ])
            pts.push([ // Add outer edge of notch
                Math.cos(theta) * radius,
                Math.sin(theta) * radius,
                0,
            ]);
          }
          if (i%2 == 0 && i%10 != 0) {
            if (i < 15) {
                redCirc.push([
                    Math.cos(theta) * (radius - 0.1), 
                    Math.sin(theta) * (radius - 0.1),
                    0,
                ])
            }
            else {
                whiteCirc.push([
                    Math.cos(theta) * (radius - 0.1), 
                    Math.sin(theta) * (radius - 0.1),
                    0,
                ])
            }
          }
          theta += angleStep;
        }
        return [pts, numPos, whiteCirc, redCirc];
    }, []);


    return (
        <>
        
        <Line points={points[0]} color="lightblue" lineWidth={5} />
        {points[1].map((pos, i) => (
            <Text position={pos} fontSize={0.15} color="lightblue">
                {7-i}
            </Text>
        ))}
        <Text position={[0,-0.3,0]} fontSize={0.2} color="orange">
            {speed}
        </Text>
        <Text position={[0,-0.5,0]} fontSize={0.1} color="white">
            km/h
        </Text>
        {points[2].map((pos) => (
            <Circle args={[0.02, 32]} position={pos} color="white" emissive="white"/>
        ))}
        {points[3].map((pos) => (
            <Circle args={[0.02, 16]} position={pos}>
                <meshStandardMaterial color="red" emissive="red"/>
            </Circle>
        ))}
        <EffectComposer>
            <Bloom luminanceThreshold={0} intensity={0.5} />
        </EffectComposer>
        </>
    );
}
