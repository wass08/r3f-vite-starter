import React, { useEffect, useState } from "react";
import Speedometer from "./Speedometer";
import { Canvas } from "@react-three/fiber";

const Loader = ({ progress }) => {
  const facts = [
    "Did you know? The first car race was held in 1895!",
    "Fun Fact: Racing tires don’t have tread for better traction.",
    "Racing lingo: 'Drafting' is when cars reduce air resistance by driving close to each other.",
    "Blocky Cars Tip: Try different cars to find the best one for each track!",
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
      <h2 style={styles.header}>Welcome to Blocky Cars</h2>
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
