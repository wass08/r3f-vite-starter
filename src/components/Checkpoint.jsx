
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Checkpoint = ({ carRef, position = [10, 1, 6], orientation = "horizontal" ,setLaps}) => {
  const checkpointRef = useRef();
  const [shouldRenderCheckpoint, setShouldRenderCheckpoint] = useState(false);
  const [isCarInitialized, setIsCarInitialized] = useState(false);
  const [passed, setPassed] = React.useState(false);
//   const [checkPointLaps,setCheckpointLaps]=useState(0);
  const lastPassTimeRef = useRef(0); // Reference to track last lap increment time
  const debounceTime = 1000; // Cooldown period in milliseconds (e.g., 1 second)


//   console.log(carRef?.current?.translation());
  useEffect(() => {
    // Polling until carRef is defined
    if (carRef.current) {
      setIsCarInitialized(true);
    }
  }, [carRef]);


//   useEffect(() => {
//    setLaps(checkPointLaps);
    
//   }, [checkPointLaps]);

//   console.log("checpoints",checkPointLaps);
  

  
  

  useFrame(() => {
    // if (!isCarInitialized || !checkpointRef.current) return;

    // Get car's current position only if carRef exists
    const carPosition = carRef?.current?.translation();

    // const carPosition = carRef.current.translation();
    const checkpointPosition = new THREE.Vector3(...position);
    const directionVector = new THREE.Vector3(carPosition.x, carPosition.y, carPosition.z).sub(checkpointPosition).normalize();
    const currentTime = Date.now();


    // Determine if the car is on the allowed side to pass
    const distanceToCheckpoint = checkpointPosition.distanceTo(new THREE.Vector3(carPosition.x, carPosition.y, carPosition.z));

    if (distanceToCheckpoint < 2 && currentTime - lastPassTimeRef.current > debounceTime) {
        setLaps(prevLaps => prevLaps + 1);
        lastPassTimeRef.current = currentTime; // Update the last pass time
      }
    //    else if ( distanceToCheckpoint < 1) {
    //   // Stop the car if approaching from the blocked side
    //   carRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    // } else if (distanceToCheckpoint > 5) {
    //   setPassed(false); // Reset checkpoint if car moves away
    // }
    

    // Update render condition based on car position
    if (carPosition.z < 5) {
      setShouldRenderCheckpoint(true);
    } else {
      setShouldRenderCheckpoint(false);
    }
  });

  return (
    <>
      {shouldRenderCheckpoint ? (
        <RigidBody type="fixed" ref={checkpointRef} position={position}>
          <mesh>
            <boxGeometry args={[20, 20, 0.1]} />
            <meshStandardMaterial color="red" transparent opacity={0.5} />
          </mesh>
        </RigidBody>
      ) : (
        <mesh position={[10, 1, 6]} >
          <boxGeometry args={[20 , 20 , 0.1]} />
          
          <meshStandardMaterial color="green" transparent opacity={0.5} />
        </mesh>
      )}
    </>
  );
};

export default Checkpoint;
