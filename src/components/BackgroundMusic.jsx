import React, { useEffect, useState } from 'react';
import backgroundMusic from '../assets/audio_files/Env1BckgrdMusic.mp3';
import cherryBlossoms from '../assets/audio_files/CherryBlossoms.mp3'

const BackgroundMusic = () => {
    
 const [audio] = useState(new Audio(backgroundMusic)); 
 const [trees] = useState(new Audio(cherryBlossoms));


  useEffect(() => {
    audio.loop = true; // Enable looping
    audio.volume = 0.4; // Set volume
    audio.play();

    trees.loop = true;
    trees.volume = 0.4;
    trees.play();

    // Add keydown event listener to handle space bar presses
  },[]);

  return null; // This component doesn't render anything visually 
};
  
export default BackgroundMusic;
  