import React, { useEffect, useState } from 'react';
import acc from '../assets/audio_files/CarSound.mp3';
import skid from '../assets/audio_files/Skidsound.mp3';

const GameWithSound = () => {
  const [carAudio] = useState(new Audio(acc));
  const [tireAudio] = useState(new Audio(skid));
  const [carLoopTimeout, setCarLoopTimeout] = useState(null);
  const [isCarMoving, setIsCarMoving] = useState(false); // Track car movement

  useEffect(() => {
    carAudio.volume = 0.35;
    tireAudio.volume = 0.3;

    const handleKeyDown = (event) => {
      if (event.code === 'ArrowUp' && carAudio.paused) {
        playCarSound();
        setIsCarMoving(true); // Car starts moving forward

        // Start a timeout to enable looping after 20 seconds
        const timeout = setTimeout(() => {
          startCarAudioLoop();
        }, 19000);
        setCarLoopTimeout(timeout);
      } else if (event.code === 'ArrowDown' && carAudio.paused) {
        playCarSound();
        setIsCarMoving(true); // Car starts moving backward
      } else if (['ArrowRight', 'ArrowLeft'].includes(event.code) && isCarMoving && tireAudio.paused) {
        playTireSound(); // Play tire sound only if car is moving
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        stopCarSound();
        setIsCarMoving(false); // Car stops moving

        // Clear the loop timeout and remove looping
        clearTimeout(carLoopTimeout);
        stopCarAudioLoop();
      } else if (['ArrowRight', 'ArrowLeft'].includes(event.code)) {
        stopTireSound();
      }
    };

    const playCarSound = () => {
      carAudio.currentTime = 5; // Start car audio at 5 seconds initially
      carAudio.play().catch((error) => console.error('Car audio play failed:', error));
    };

    const stopCarSound = () => {
      carAudio.pause();
      carAudio.currentTime = 5; // Reset to 5 seconds when stopped
    };

    const startCarAudioLoop = () => {
      carAudio.currentTime = 19; // Start looping segment from 19 seconds
      carAudio.loop = false; // Disable default loop to handle custom looping

      carAudio.addEventListener('timeupdate', loopBetweenSegments);
    };

    const stopCarAudioLoop = () => {
      carAudio.removeEventListener('timeupdate', loopBetweenSegments);
      carAudio.loop = false;
      carAudio.currentTime = 5; // Reset to 5 seconds for the next play
    };

    const loopBetweenSegments = () => {
      if (carAudio.currentTime >= 25) {
        carAudio.currentTime = 19; // Reset to 19 seconds to create the loop
        carAudio.play();
      }
    };

    const playTireSound = () => {
      tireAudio.currentTime = 0;
      tireAudio.play().catch((error) => console.error('Tire audio play failed:', error));
    };

    const stopTireSound = () => {
      tireAudio.pause();
      tireAudio.currentTime = 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(carLoopTimeout);
      stopCarAudioLoop(); // Cleanup loop when unmounting
    };
  }, [carAudio, tireAudio, carLoopTimeout, isCarMoving]);

  return null;
};

export default GameWithSound; 