import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Nether } from "../assets/track/Track2/Nether";
import { NetherHome } from "../assets/Home/NetherHome";
import { EndHome } from "../assets/Home/EndHome";
import { CherryBlossomHome } from "../assets/Home/CherryBlossomHome";
import { Hummer } from "./Cars/Hummer";

export default function StartMenu({
  onTrackSelect,
  loading,
  progress,
  onCarSelect,
}) {
  let color = "#fc4b4b";
  let lightColor = "#fc4b4b";
  let far = 100;
  const [Home, setHome] = useState(1);
  const [carIndex, setCarIndex] = useState(0);

  if (Home === 1) {
    far = 125;
    color = "#d691ca";
    lightColor = "#f8def4";
  } else if (Home === 2) {
    far = 85;
    color = "#fc4b4b";
    lightColor = "#fc4b4b";
  } else if (Home === 3) {
    far = 100;
    color = "#5a5151";
    lightColor = "#ffffff";
  }

  const handleCarChange = (direction) => {
    setCarIndex((prev) =>
      direction === "next" ? (prev + 1) % 4 : Math.max(prev - 1, 0)
    );
  };

  return (
    <>

      <div
        className="minecraft-style"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#fff",
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Blocky Cars</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => handleCarChange("prev")}
            disabled={loading}
            style={{ ...sideButtonStyle, marginRight: "auto" }}
          >
            {"<"} Prev Car
          </button>

          <span style={{ fontSize: "24px" }}>Car {carIndex + 1}</span>

          <button
            onClick={() => handleCarChange("next")}
            disabled={loading}
            style={{ ...sideButtonStyle, marginLeft: "auto" }}
          >
            Next Car {">"}
          </button>
        </div>
        <h2>Select a Track</h2>

        <div
          className="button-container"
          style={{ display: "flex", gap: "10px" }}
        >
          <button
            onClick={() => setHome(1)}
            disabled={loading}
            style={buttonStyle}
          >
            Cherry Blossom
          </button>
          <button
            onClick={() => setHome(2)}
            disabled={loading}
            style={buttonStyle}
          >
            Nether Realm
          </button>
          <button
            onClick={() => setHome(3)}
            disabled={loading}
            style={buttonStyle}
          >
            End Map
          </button>
          <button
            onClick={() => {
              onTrackSelect(Home);
              onCarSelect(carIndex+1);
            }}
            disabled={loading}
            style={{ ...buttonStyle, backgroundColor: "green", color: "white" }}
          >
            Play
          </button>
        </div>

        {loading && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "10px",
              backgroundColor: "#333",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "#4CAF50",
                transition: "width 0.3s ease",
              }}
            ></div>
          </div>
        )}
      </div>

      <Canvas
        shadows
        camera={{ fov: 60, near: 0.1, far: 2000, position: [0, 50, 200] }}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <fog attach="fog" color={color} near={1} far={far} />
        <ambientLight intensity={-2} />
        <directionalLight
          color={lightColor}
          castShadow={true}
          position={[85, 150, 0]}
          intensity={10}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-1000}
          shadow-camera-right={1000}
          shadow-camera-top={1000}
          shadow-camera-bottom={-1000}
          shadow-camera-near={1}
          shadow-camera-far={1500}
          shadow-bias={-0.001}
        />
        {Home === 1 && <CherryBlossomHome />}
        {Home === 2 && <NetherHome />}
        {Home === 3 && <EndHome />}
      </Canvas>
    </>
  );
}

const buttonStyle = {
  padding: "12px 24px",
  fontSize: "20px",
  margin: "10px",
  cursor: "pointer",
  backgroundColor: "#2196F3",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
};

const sideButtonStyle = {
  padding: "10px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#2196F3",
  border: "none",
  borderRadius: "5px",
  color: "#fff",
};
