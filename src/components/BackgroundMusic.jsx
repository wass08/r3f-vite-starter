// import React, { useEffect, useState } from 'react';
// import env1BckgrdMusic from '../assets/audio_files/Env1BckgrdMusic.mp3';
// import cherryBlossoms from '../assets/audio_files/CherryBlossoms.mp3';
// import netherMusic from '../assets/audio_files/NetherMusic.mp3';
// import netherAmbiance from '../assets/audio_files/NetherAmbiance.mp3';
// import spaceMusic from '../assets/audio_files/SpaceMusic.mp3';
// import spaceAmbiance from '../assets/audio_files/SpaceAmbiance.mp3';

// const BackgroundMusic = ({ track }) => {
//   const [audio, setAudio] = useState(null);
//   const [ambientSound, setAmbientSound] = useState(null);

//   useEffect(() => {
//     let newAudio, newAmbientSound;

//     // Set audio sources based on the track
//     switch (track) {
//       case 1: // Cherry Blossom track
//         newAudio = new Audio(env1BckgrdMusic);
//         newAmbientSound = new Audio(cherryBlossoms);
//         break;
//       case 2: // Nether track
//         newAudio = new Audio(netherMusic);
//         newAmbientSound = new Audio(netherAmbiance); // No ambient sound for this track
//         break;
//       case 3: // Space track
//         newAudio = new Audio(spaceMusic);
//         newAmbientSound = new Audio(spaceAmbiance); // No ambient sound for this track
//         break;
//       default:
//         return; // No track selected, return early
//     }

//     newAudio.loop = true;
//     newAudio.volume = 0.65;
//     if (newAmbientSound) {
//       newAmbientSound.loop = true;
//       newAmbientSound.volume = 0.4;
//     }

//     // Function to start playing the sounds from specific points after user interaction
//     const startMusic = () => {
//       if (track === 3) { // If it's the Space track
//         newAudio.currentTime = 60; // Start space music at 1:00
//       } else {
//         newAudio.currentTime = 17; // Start background music at 17 seconds
//       }
      
//       if (newAmbientSound) {
//         newAmbientSound.currentTime = 5; // Start ambient sound at 5 seconds
//       }

//       newAudio.play().catch((error) => {
//         console.error('Background music play failed:', error);
//       });
//       if (newAmbientSound) {
//         newAmbientSound.play().catch((error) => {
//           console.error('Ambient sound play failed:', error);
//         });
//       }
//     };

//     // Listen for any interaction (click or keypress) to start music
//     window.addEventListener('click', startMusic, { once: true });
//     window.addEventListener('keydown', startMusic, { once: true });

//     // Clean up event listeners and audio when the component is unmounted
//     return () => {
//       window.removeEventListener('click', startMusic);
//       window.removeEventListener('keydown', startMusic);
//       newAudio.pause();
//       newAudio.currentTime = 0;
//       if (newAmbientSound) {
//         newAmbientSound.pause();
//         newAmbientSound.currentTime = 0;
//       }
//     };
//   }, [track]); // Rerun when the track changes

//   return null;
// };

// export default BackgroundMusic;
import React, { useEffect, useState } from 'react';
import env1BckgrdMusic from '../assets/audio_files/Env1BckgrdMusic.mp3';
import cherryBlossoms from '../assets/audio_files/CherryBlossoms.mp3';
import netherMusic from '../assets/audio_files/NetherMusic.mp3';
import netherAmbiance from '../assets/audio_files/NetherAmbiance.mp3';
import spaceMusic from '../assets/audio_files/SpaceMusic.mp3';
import spaceAmbiance from '../assets/audio_files/SpaceAmbiance.mp3';

const BackgroundMusic = ({ track }) => {
  const [audio, setAudio] = useState(null);
  const [ambientSound, setAmbientSound] = useState(null);

  useEffect(() => {
    let newAudio, newAmbientSound;

    // Set audio sources based on the track
    switch (track) {
      case 1: // Cherry Blossom track
        newAudio = new Audio(env1BckgrdMusic);
        newAmbientSound = new Audio(cherryBlossoms);
        break;
      case 2: // Nether track
        newAudio = new Audio(netherMusic);
        newAmbientSound = new Audio(netherAmbiance);
        break;
      case 3: // Space track
        newAudio = new Audio(spaceMusic);
        newAmbientSound = new Audio(spaceAmbiance);
        break;
      default:
        return; // No track selected, return early
    }

    newAudio.loop = true;
    newAudio.volume = 0.65;
    if (newAmbientSound) {
      newAmbientSound.loop = true;
      newAmbientSound.volume = 0.4;
    }

    // Start the audio immediately
    const startMusic = () => {
      if (track === 3) { // If it's the Space track
        newAudio.currentTime = 60; // Start space music at 1:00
      } else {
        newAudio.currentTime = 17; // Start background music at 17 seconds
      }

      if (newAmbientSound) {
        newAmbientSound.currentTime = 5; // Start ambient sound at 5 seconds
      }

      newAudio.play().catch((error) => {
        console.error('Background music play failed:', error);
      });
      if (newAmbientSound) {
        newAmbientSound.play().catch((error) => {
          console.error('Ambient sound play failed:', error);
        });
      }
    };

    startMusic(); // Automatically start music without user interaction

    // Clean up audio when the component is unmounted
    return () => {
      newAudio.pause();
      newAudio.currentTime = 0;
      if (newAmbientSound) {
        newAmbientSound.pause();
        newAmbientSound.currentTime = 0;
      }
    };
  }, [track]); // Rerun when the track changes

  return null;
};

export default BackgroundMusic;
