import * as THREE from 'three';
import {useFrame, useLoader} from "@react-three/fiber";
import {useMemo, useRef} from "react"

export const Snowing = () => {
    const numSnowflakes = 1000;
    // snowflakes placed from -500 to 500 on x, z
    const maxRange = 1000, minRange = maxRange/2;
    const minHeight = 150;
    const snowImg = useLoader(THREE.TextureLoader, "../sprites/snowflake.png");

    const { positions, velocities } = useMemo(() => {
        let positions = [];
        let velocities = [];
        for (let i = 0; i < numSnowflakes; i++) {
            positions.push(
                Math.random() * maxRange - minRange, // x
                Math.random() * minRange + minHeight, // y
                Math.random() * maxRange - minRange  // z
            );
            velocities.push(
                (Math.random() * 6 - 3) * 0.1, // x velocity
                (Math.random() * 5 + 0.12) * 0.18, // y velocity
                (Math.random() * 6 - 3) * 0.1 // z velocity
            );
        }
        return { positions: new Float32Array(positions.flat()), velocities: velocities };
    }, []);

    const bufferRef = useRef();

    useFrame(() => {
        if (bufferRef.current && bufferRef.current.array) {
            const positions = bufferRef.current.array;
            for (let i = 0; i < numSnowflakes * 3; i = i + 3) {
                positions[i] -= velocities[i];
                positions[i + 1] -= velocities[i + 1];
                positions[i + 2] -= velocities[i + 2];

                if (positions[i + 1] < 0) {
                    positions[i] = Math.floor(Math.random() * maxRange - minRange);
                    positions[i + 1] = Math.floor(Math.random() * minRange + minHeight);
                    positions[i + 2] = Math.floor(Math.random() * minRange - minRange);
                }
            }
            bufferRef.current.needsUpdate = true;
        }
    })

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    ref={bufferRef}
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count={numSnowflakes}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                map={snowImg}
                size={4}
                transparent={false}
                opacity={0.7}
                depthTest={false}
            />
        </points>
    );
}