import React, { useEffect, useState } from 'react';
import acc from '../assets/audio_files/CarSound.mp3'; // Path to your car sound file
import skid from '../assets/audio_files/Skidsound.mp3'; // Path to your tire skid sound file

const GameWithSound = () => {
  const [carAudio] = useState(new Audio(acc)); // Create an audio object for the car sound
  const [tireAudio] = useState(new Audio(skid)); // Create an audio object for the tire sound

  useEffect(() => {
   
    carAudio.volume = 0.65; 
    tireAudio.volume = 0.4;
    
    const handleKeyDown = (event) => {
      if (event.code === 'ArrowUp' && carAudio.paused) {
        playCarSound(); 
      }
      else if (event.code === 'ArrowRight' && tireAudio.paused) {
        playTireSound(); 
      }
      else if (event.code === 'ArrowLeft' && tireAudio.paused) {
        playTireSound(); 
      }
    };

  
    const handleKeyUp = (event) => {
      if (event.code === 'ArrowUp') {
        stopCarSound(); 
      }
      else if (event.code === 'ArrowRight') {
        stopTireSound(); 
      }
      else if (event.code === 'ArrowLeft') {
        stopTireSound();
      }
    };


    const playCarSound = () => {
      carAudio.currentTime = 0; 
      carAudio.play().catch((error) => {
        console.error('Car audio play failed:', error); // Handle any errors
      });
    };

    
    const stopCarSound = () => {
      carAudio.pause(); 
      carAudio.currentTime = 0; 
    };

    
    const playTireSound = () => {
      tireAudio.currentTime = 0; 
      tireAudio.play().catch((error) => {
        console.error('Tire audio play failed:', error); 
      });
    };

    
    const stopTireSound = () => {
      tireAudio.pause(); 
      tireAudio.currentTime = 0; 
    };

    // Attach event listeners for keydown and keyup events
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup event listeners when component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [carAudio, tireAudio]);

  return null; // This component doesn't render anything visually 
};

export default GameWithSound;
