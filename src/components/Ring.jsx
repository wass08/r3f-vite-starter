import { Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo } from 'react';

export default function Ring() {

    const points = useMemo(() => {
        const radius = 1;
        const segments = 63;
        let theta = -Math.PI / 6;
        const angleStep = (Math.PI * 4/3) / segments;
        const pts = [];
        for (let i = 0; i <= segments; i++) {
          pts.push([Math.cos(theta) * radius, Math.sin(theta) * radius, 0]);
          if (i%9 == 0) {
            pts.push([
                Math.cos(theta) * (radius - 0.1), // Move inward for the notch
                Math.sin(theta) * (radius - 0.1),
                0,
            ]);
            pts.push([ // Add outer edge of notch
                Math.cos(theta) * radius,
                Math.sin(theta) * radius,
                0,
            ]);
          }
          theta += angleStep;
        }
        return pts;
    }, []);

    return (
        <>
        <Line points={points} color="lightblue" lineWidth={5} />
        
        <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={0.5} />
        </EffectComposer>
        </>
    );
}
dfhgdfh