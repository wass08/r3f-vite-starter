// import React, { useState, useEffect, useRef } from 'react';

// export function Timer({ startTimer, Laps,setTotalTime,IsPaused }) {
//   const [time, setTime] = useState(0);
//   setTotalTime(time);
  
//   const timerRef = useRef(null); // Use ref to store the interval ID
//   const [LapTimes, setLapTimes] = useState({});

//   // Start the timer when the `startTimer` prop is true
//   useEffect(() => {
//     if (startTimer && !timerRef.current) {
//       timerRef.current = setInterval(() => {
//         setTime((prevTime) => prevTime + 1); // Increment time by 1 second
//       }, 1000);
//     } else if (!startTimer && timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//       setTime(0); // Reset time when timer stops
//     }

//     // Cleanup interval on unmount or timer stop
//     return () => {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     };
//   }, [startTimer]);

//   // Track lap times whenever `Laps` changes
//   useEffect(() => {
//     if (Laps -1> 0) {
//       setLapTimes((prevLapTimes) => ({
//         ...prevLapTimes,
//         [`Checkpoint ${Laps-1}`]: time,
//       }));
//       // setTime(0); // Reset time for the next lap
//     }
//   }, [Laps]);

//   // Reset everything when the "R" key is pressed
//   useEffect(() => {
//     const handleReset = (event) => {
//       if (event.key.toLowerCase() === 'r') {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//         setTime(0);
//         setLapTimes({});
//       }
//     };

//     window.addEventListener('keydown', handleReset);
    
//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener('keydown', handleReset);
//     };
//   }, []);

//   return (
//     <div>
//       <div>Time Elapsed: {time} seconds</div>
//       <div>Checkpoint Times:</div>
//       <ul>
//         {Object.entries(LapTimes).map(([lap, lapTime]) => (
          
//           <li key={lap}>
//             {lap}: {lapTime} seconds
//           </li>
          
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';

export function Timer({ startTimer, Laps, setTotalTime, IsPaused,end }) {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Use ref to store the interval ID
  const [LapTimes, setLapTimes] = useState({});
if(time>0 && !end){
  setTotalTime(time);


}

  // Start, pause, and reset the timer based on `startTimer` and `IsPaused`
  useEffect(() => {
    if (startTimer && !IsPaused && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time by 1 second
      }, 1000);
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
        [`Checkpoint ${Laps - 1}`]: time,
      }));
      // Optionally reset lap time if needed
      // setTime(0);
    }
  }, [Laps, time]);

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
