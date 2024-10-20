import React, { useEffect, useState } from 'react';
import backgroundMusic from '../assets/audio_files/Env1BckgrdMusic.mp3';
import cherryBlossoms from '../assets/audio_files/CherryBlossoms.mp3'

const BackgroundMusic = () => {
    
 const [audio] = useState(new Audio(backgroundMusic)); 
 const [trees] = useState(new Audio(cherryBlossoms));


  useEffect(() => {
    audio.loop = true; // Enable looping
    audio.volume = 0.4; // Set volume for the background music

    trees.loop = true; // Enable looping for the tree sound
    trees.volume = 0.4; // Set volume for the tree sound

    // Function to start playing the music after user interaction
    const startMusic = () => {
      audio.play().catch((error) => {
        console.error('Background music play failed:', error);
      });
      trees.play().catch((error) => {
        console.error('Tree sound play failed:', error);
      });
    };

    // Listen for any interaction (click or keypress)
    window.addEventListener('click', startMusic, { once: true });
    window.addEventListener('keydown', startMusic, { once: true });

    // Clean up event listeners when the component is unmounted
    return () => {
      window.removeEventListener('click', startMusic);
      window.removeEventListener('keydown', startMusic);
    };
  }, [audio, trees]);

  return null;
};
  
export default BackgroundMusic;
  