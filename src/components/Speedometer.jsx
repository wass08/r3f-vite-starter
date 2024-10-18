import Ring from "./Ring";
import { useMemo } from "react";
import { Circle } from '@react-three/drei';

export default function Speedometer({speed}) {

    const points = useMemo(() => {
        const radius = 1;
        const segments = 70;
        let theta = -Math.PI / 6;
        const angleStep = (Math.PI * 4/3) / segments;
        const whiteCirc = [];
        const redCirc = [];
        for (let i = 0; i <= segments; i+=2) {
          if (i%10 != 0) {
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
          theta += 2*angleStep;
        }
        return [whiteCirc, redCirc];
    }, []);

    return (
        <>
        
        
        <Ring speed={speed} />
    
        
        </>
    );

}