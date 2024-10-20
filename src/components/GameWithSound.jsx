import React, { useEffect, useState } from 'react';
import acc from '../assets/audio_files/CarSound.mp3'; // Path to your sound file

const GameWithSound = () => {
  const [carAudio] = useState(new Audio(acc)); // Create an audio object for the car sound

  useEffect(() => {
    // Set up car sound properties
    carAudio.volume = 0.75; // Set volume for the car sound

    // Function to handle keydown event
    const handleKeyDown = (event) => {
      if (event.code === 'ArrowUp' && carAudio.paused) {
        playSound(); // Play sound when the up arrow is pressed
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'ArrowUp') {
        stopSound(); // Stop sound when the up arrow is released
      }
    };

    // Function to play sound
    const playSound = () => {
      carAudio.currentTime = 0; // Reset audio to the beginning
      carAudio.play().catch((error) => {
        console.error('Audio play failed:', error); // Handle any errors
      });
    };

    const stopSound = () => {
      carAudio.pause(); // Pause the audio
      carAudio.currentTime = 0; // Reset audio to the beginning if desired
    };

     // Attach event listeners for keydown and keyup events
     window.addEventListener('keydown', handleKeyDown);
     window.addEventListener('keyup', handleKeyUp);
 
     // Cleanup event listeners when component is unmounted
     return () => {
       window.removeEventListener('keydown', handleKeyDown);
       window.removeEventListener('keyup', handleKeyUp);
     };
   }, [carAudio]);

  return null; // This component doesn't render anything visually 
};

export default GameWithSound;
