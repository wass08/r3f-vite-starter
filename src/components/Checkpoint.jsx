import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const Checkpoint = ({ carRef, position = [10, 1, 6], orientation = "horizontal" ,setLaps}) => {
  const checkpointRef = useRef();
  const [shouldRenderCheckpoint, setShouldRenderCheckpoint] = useState(false);
  const [changeLap,setChangeLap]=useState(false);
  const [isCarInitialized, setIsCarInitialized] = useState(false);
  const [passed, setPassed] = React.useState(false);
//   const [checkPointLaps,setCheckpointLaps]=useState(0);
  const lastPassTimeRef = useRef(0); // Reference to track last lap increment time
  const debounceTime = 1000; // Cooldown period in milliseconds (e.g., 1 second)
  const [Distance,setDistance]=useState(0);

  const [checkLaps,setCheckLaps]=useState(0)


  useEffect(() => {
    // Polling until carRef is defined
    if (carRef.current) {
      setIsCarInitialized(true);
    }
  }, [carRef]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      
      if (event.key.toLowerCase() === 'r') {
        setLaps(prev=>prev%1===0?1:0.5); // Reset laps to 0 when 'R' is pressed
      }
    };

    // Attach the event listener to the window
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [setLaps]);




  
  

  useFrame(() => {
    // if (!isCarInitialized || !checkpointRef.current) return;

    // Get car's current position only if carRef exists
    const carPosition = carRef?.current?.translation();
    // console.log(carPosition.z);
    

    // // const carPosition = carRef.current.translation();
    const checkpointPosition = new THREE.Vector3(...position);
    // const directionVector = new THREE.Vector3(carPosition.x, carPosition.y, carPosition.z).sub(checkpointPosition).normalize();
    // const currentTime = Date.now();


    // // Determine if the car is on the allowed side to pass
    const distanceToCheckpoint = checkpointPosition.distanceTo(new THREE.Vector3(carPosition.x, carPosition.y, carPosition.z));
    // console.log(distanceToCheckpoint);
    setDistance(distanceToCheckpoint);
    

    // if (distanceToCheckpoint < 2 && currentTime - lastPassTimeRef.current > debounceTime) {
    //     setLaps(prevLaps => prevLaps + 1);
    //     lastPassTimeRef.current = currentTime; // Update the last pass time
    //   }


    // Update render condition based on car position
    
    if (carPosition.z < 6  ) {
    
      setShouldRenderCheckpoint(true);
    } else {
      setShouldRenderCheckpoint(false);
    }
  });

  useEffect(()=>{
    setLaps(prevLaps => prevLaps + 0.5);
    


  },[shouldRenderCheckpoint])

  

  return (
    <>
    {Distance>100?
         !shouldRenderCheckpoint ? (
          <RigidBody type="fixed" ref={checkpointRef} position={position}>
            <mesh>
              <boxGeometry args={[1000, 1000, 1]} />
              <meshStandardMaterial color="red" transparent opacity={0.5} />
            </mesh>
          </RigidBody>
        ) : (
          <mesh position={position} >
            <boxGeometry args={[1000 , 1000 , 1]} />
            
            <meshStandardMaterial color="green" transparent opacity={0.5} />
          </mesh>
        )
        :
        shouldRenderCheckpoint ? (
          <RigidBody type="fixed" ref={checkpointRef} position={position}>
            <mesh>
              <boxGeometry args={[1000, 1000, 1]} />
              <meshStandardMaterial color="red" transparent opacity={0.5} />
            </mesh>
          </RigidBody>
        ) : (
          <mesh position={position} >
            <boxGeometry args={[1000 , 1000 , 1]} />
            
            <meshStandardMaterial color="green" transparent opacity={0.5} />
          </mesh>
        )
    
    
    }
    
 
    </>
  );
};

export default Checkpoint;
