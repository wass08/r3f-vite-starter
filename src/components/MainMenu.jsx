import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useState } from 'react';
import './styles.css';


export default function MainMenu() {

    const [menu, setMenu] = useState('main');
    const handlePlayClick = () => {
        setMenu('play');
    };
    const handleBack = () => {
        setMenu('main');
    };

    return (
        <Canvas style={{ background : "black" }}>
                    {menu === 'main' ? (
                        <Html position={[-6, 2, 0]} center>
                        <div className="main-menu">
                            <h1>Main Menu</h1>
                            <div className="menu-options">
                        <div className="menu-item" onClick={handlePlayClick}>Play</div>
                        <div className="menu-item">Controls</div>
                        </div>
                        </div>
                        </Html>
                    ) : (
                        <Html position={[-6, 0.55, 0]} center>
                        <div className="main-menu">
                            <h1>Main Menu</h1>
                            <div className="menu-options"></div>
                        <div className="menu-item">Level 1</div>
                        <div className="menu-item">Level 2</div>
                        <div className="menu-item">Level 3</div>
                        <div className="menu-item" onClick={handleBack}>Back</div>
                        </div>
                        </Html>
                    )}
        </Canvas>
    );
}
