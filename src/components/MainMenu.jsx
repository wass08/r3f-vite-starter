import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useState } from 'react';
import './styles.css';

export default function MainMenu() {
    const [menu, setMenu] = useState('main');

    // Handler to navigate to the Play menu
    const handlePlayClick = () => {
        setMenu('play');
    };

    // Handler to go back to the Main menu
    const handleBack = () => {
        setMenu('main');
    };

    // Handler to navigate to the Controls menu
    const handleControlsClick = () => {
        setMenu('controls');
    };

    return (
        <Canvas style={{ background: "black" }}>
            {menu === 'main' ? (
                <Html position={[-6, 2, 0]} center>
                    <div className="main-menu">
                        <h1>Main Menu</h1>
                        <div className="menu-options">
                            <div className="menu-item" onClick={handlePlayClick}>Play</div>
                            <div className="menu-item" onClick={handleControlsClick}>Controls</div>
                        </div>
                    </div>
                </Html>
            ) : menu === 'play' ? (
                <Html position={[-6, 0.55, 0]} center>
                    <div className="main-menu">
                        <h1>Play Menu</h1>
                        <div className="menu-options">
                            <div className="menu-item">Level 1</div>
                            <div className="menu-item">Level 2</div>
                            <div className="menu-item">Level 3</div>
                            <div className="menu-item" onClick={handleBack}>Back</div>
                        </div>
                    </div>
                </Html>
            ) : (
                <Html position={[-6, 0.55, 0]} center>
                    <div style={{ marginBottom: "30px" }}>
                        <ul style={{color: "white" ,listStyle: "none", padding: 0 }}>
                        <li>⬆️ Up Arrow: Accelerate</li>
                        <li>⬇️ Down Arrow: Brake/Reverse</li>
                        <li>➡️ Right Arrow: Turn Right</li>
                        <li>⬅️ Left Arrow: Turn Left</li>
                        <li>Space: Drift</li>
                        <li>C: Change Camera View</li>
                        <li>R: Restart from the begining</li>
                        </ul>
                        <div className="menu-item" onClick={handleBack}>Back</div>
                    </div>
                </Html>
            )}
        </Canvas>
    );
}
