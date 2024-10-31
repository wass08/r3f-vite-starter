import Ring from "./Ring";
import { useMemo } from "react";
import { Circle } from '@react-three/drei';
import { MeshStandardMaterial, BufferGeometry, Float32BufferAttribute } from 'three';


export default function Speedometer({speed}) {

    const MAX_SPEED = 300;
    const angle = 4*Math.PI/6 - (15*Math.PI/12)*(speed/MAX_SPEED);

    const geometry = useMemo(() => {
        // Define vertices for the triangle (three 3D points)
        const vertices = new Float32Array([
          0, 0.8, 0,  // Vertex 1 (top)
          -0.04, 0, 0, // Vertex 2 (bottom left)
          0.04, 0, 0,  // Vertex 3 (bottom right)
        ]);
    
        const geom = new BufferGeometry();
        geom.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        return geom;
    }, []);

    return (
        <>
        <Ring speed={speed}/>
        <mesh geometry={geometry} renderOrder={1} rotation={[0, 0, angle]}>
            <meshStandardMaterial emissive="red"/>
        </mesh>
        <Circle args={[0.07, 32]} renderOrder={2}>
            <meshStandardMaterial emissive="black"/>
        </Circle>
        
        </>
    );

}