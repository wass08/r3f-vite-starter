import React, { useEffect, useState } from "react";
import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";
import logo from "./images/logo.png";


const Loader = ({ progress }) => {
 const facts = [
   "Fun Fact: Every car in Blocky Cars has its own unique handling—find the one that suits your style best!",
   "Did you know? Blocky Cars was inspired by classic kart racing games, bringing nostalgia with a blocky twist!",
   "Blocky Cars Secret: Try taking shortcuts on certain tracks to gain a big advantage!",
   "Pro Tip: Mastering the perfect boost start can help you gain an early lead!",
   "Fun Fact: The tracks in Blocky Cars were built using Minecraft blocks and then transformed for 3D racing!",
   "Did you know? The blocky environment adds a unique challenge as you navigate twists and turns!",
   "Challenge: Try beating your own best time on each track to become a Blocky Cars legend!",
   "Tip: Each track has a 'sweet spot' for braking before turns. Find it for smoother cornering!",
   "Challenge: Can you complete a perfect lap without crashing? It’s harder than it sounds!",
   "Blocky Cars Fact: Every track in Blocky Cars was handcrafted in Minecraft and brought to life here!",
   "Tip: Time trials are a great way to learn the tracks and improve your racing skills!",
   "Did you know? Choosing the right car can be the key to shaving seconds off your time!",
   "Fun Fact: Blocky Cars combines Minecraft-like textures with smooth, arcade-style racing!",
   "Challenge: Beat the developer's high score on each track! Can you do it?",
   "Pro Tip: Use the drift wisely to get around tight corners faster!",
   "Fun Fact: Blocky Cars' multiplayer mode is coming soon! Practice your skills to stay ahead of the competition!",
 ];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 3000); // Change fact every 3 seconds

    return () => clearInterval(factInterval);
  }, []);
  const roundedProgress = Math.round(progress*2); // Round the progress value
  return (
    <div style={styles.loaderContainer}>
      <h1 style={{ fontSize: "48px", marginBottom: "150px" }}>
        <img src={logo} />
      </h1>

      <Canvas>
        <Speedometer speed={roundedProgress} />
      </Canvas>

      <p style={styles.fact}>{facts[factIndex]}</p>
    </div>
  );
};

// Basic inline styles for the loader components
const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#222",
    color: "#fff",
  },
  header: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  speedometer: {
    position: "relative",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
  },
  progressCircle: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: "1.5em",
    color: "#fff",
  },
  fact: {
    marginTop: "20px",
    fontSize: "1.2em",
    textAlign: "center",
    width: "80%",
    maxWidth: "400px",
  },
};

export default Loader;
