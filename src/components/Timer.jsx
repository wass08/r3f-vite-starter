import React, { useState, useEffect, useRef } from 'react';
import './styles.css'

export function Timer({ startTimer }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Use ref to store the interval ID

  // Start the timer when the `startTimer` prop is true
  useEffect(() => {
    
    if (startTimer && !timerRef.current) {  // Check if the timer has started
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1); // Increment time by 1 second
      }, 1000);
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

  return(
    <div className='bebas-neue-regular'>
      Time Elapsed: {time} seconds
    </div>
    );
}
