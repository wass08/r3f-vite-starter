// import React, { useState, useEffect, useRef } from 'react';

// export function Timer({ startTimer,Laps }) {
//   const [time, setTime] = useState(0);
//   const timerRef = useRef(null); // Use ref to store the interval ID
//   const[LapTimes,setlapTimes]=useState({Lap1:0,Lap2:0,Lap3:0})
//   useEffect(()=>{

//   },[Laps])

//   // Start the timer when the `startTimer` prop is true
//   useEffect(() => {
    
//     if (startTimer && !timerRef.current) {  // Check if the timer has started
//       timerRef.current = setInterval(() => {
//         setTime(prevTime => prevTime + 1); // Increment time by 1 second
//       }, 1000);
//     }
//     else{
//       setTime(0);
//     }

//     // Cleanup interval when the component unmounts or when the timer stops
//     return () => {
//       clearInterval(timerRef.current);
//       timerRef.current = null; // Reset the timer reference
//     };
//   }, [startTimer]); // This will run when `startTimer` changes

//   return (

//   <div>Time Elapsed: {time} seconds</div>
  


// );
// }

import React, { useState, useEffect, useRef } from 'react';

export function Timer({ startTimer, Laps,setTotalTime }) {
  const [time, setTime] = useState(0);
  setTotalTime(time);
  
  const timerRef = useRef(null); // Use ref to store the interval ID
  const [LapTimes, setLapTimes] = useState({});

  // Start the timer when the `startTimer` prop is true
  useEffect(() => {
    if (startTimer && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time by 1 second
      }, 1000);
    } else if (!startTimer && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTime(0); // Reset time when timer stops
    }

    // Cleanup interval on unmount or timer stop
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [startTimer]);

  // Track lap times whenever `Laps` changes
  useEffect(() => {
    if (Laps > 0) {
      setLapTimes((prevLapTimes) => ({
        ...prevLapTimes,
        [`Checkpoint ${Laps-1}`]: time,
      }));
      // setTime(0); // Reset time for the next lap
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

  return (
    <div>
      <div>Time Elapsed: {time} seconds</div>
      <div>Checkpoint Times:</div>
      <ul>
        {Object.entries(LapTimes).map(([lap, lapTime]) => (
          <li key={lap}>
            {lap}: {lapTime} seconds
          </li>
        ))}
      </ul>
    </div>
  );
}

