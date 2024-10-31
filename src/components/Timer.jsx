import React, { useState, useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import './styles.css'

export function Timer({ startTimer }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Use ref to store the interval ID

  // Start the timer when the `startTimer` prop is true
  useEffect(() => {
    
    if (startTimer && !timerRef.current) {  // Check if the timer has started
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime +0.1); // Increment time by 10 miliseconds
      }, 10);
    }
    else{
      setTime(0);
    }

    // Cleanup interval when the component unmounts or when the timer stops
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null; // Reset the timer reference
    };
  }, [startTimer]); // This will run when `startTimer` changes
  let secs = (time%60).toFixed(2);
  let mins = Math.floor(time/60);
  
  if (secs < 10) {
    secs = '0'.concat(secs.toString())
  }
  if (mins < 10) {
    mins = '0'.concat(mins.toString())
  }
  

  return(
    <>
    <Html position={[5,3.5,0]}>
        <div className='bebas-neue-regular'>
          TIME
        </div>
    </Html>
    <Html position={[6,3.5,0]}>
        <div className='bebas-neue-regular'>
          {mins}:{secs}
        </div>
    </Html>
    </>
    );
}
