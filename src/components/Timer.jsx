
import React, { useState, useEffect, useRef } from 'react';

export function Timer({ startTimer, Laps, setTotalTime, IsPaused,end }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Use ref to store the interval ID
  const [LapTimes, setLapTimes] = useState({});
if(time>0 && !end){
  setTotalTime(Number(time.toFixed(2)));


}

  // Start, pause, and reset the timer based on `startTimer` and `IsPaused`
  useEffect(() => {
    if (startTimer && !IsPaused && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.05); // Increment time by 1 second
      }, 1);
    } else if ((!startTimer || IsPaused) && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else if (!startTimer) {
      setTime(0); // Reset time when timer stops completely
    }

    // Cleanup interval on unmount
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [startTimer, IsPaused]);

  // Track lap times whenever `Laps` changes
  useEffect(() => {
    if (Laps - 1 > 0) {
      setLapTimes((prevLapTimes) => ({
        ...prevLapTimes,
        [`Checkpoint ${Laps - 1}`]: Number(time.toFixed(2)),
      }));
      // Optionally reset lap time if needed
      // setTime(0);
    }
  }, [Laps]);

  // Reset everything when the "R" key is pressed
  useEffect(() => {
    const handleReset = (event) => {
      if (event.key.toLowerCase() === 'r') {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTime(0);
        setLapTimes({});
      }
    };

    window.addEventListener('keydown', handleReset);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleReset);
    };
  }, []);

  let secs = (time%60).toFixed(2);
  let mins = Math.floor(time/60);
  
  if (secs < 10) {
    secs = '0'.concat(secs.toString())
  }
  if (mins < 10) {
    mins = '0'.concat(mins.toString())
  }

  return (
    <div style={{color:"white"}}>
        <div className='bebas-neue-regular'>
          TIME
        </div>
        <div className='bebas-neue-regular'>
          {mins}:{secs}
        </div>
      <ul style={{listStyleType:"none"}}>
        {Object.entries(LapTimes).map(([lap, lapTime]) => (
          <li key={lap}>
            {lap}: {lapTime} 
          </li>
        ))}
      </ul>
    </div>
  );
}
