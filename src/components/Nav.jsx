    import React from 'react';
    import './Style.css';

    export const Nav = (props) => {
    const { onSectionChange, navOpened, setNavOpened } = props;

    return (
        <>
        <button
            onClick={() => setNavOpened (!navOpened)}
            className="menu-button"
        >
            <div
            className={`line line-top ${navOpened ? "rotate" : ""}`}
            />
            <div
            className={`line line-middle ${navOpened ? "hidden" : ""}`}
            />
            <div
            className={`line line-bottom ${navOpened? "rotate" : ""}`}
            />
        </button>

        <div className={`menu-container ${navOpened? "open" : "closed"}`}>
            <div className="menu-items">
            <button 
                className="menu-item" 
                onClick={() => onSectionChange(0)}>
                About
            </button>
            <button 
                className="menu-item" 
                onClick={() => onSectionChange(1.5)}>
                Skills
            </button>
            <button 
                className="menu-item" 
                onClick={() => onSectionChange(3)}>
                Projects
            </button>
            <button 
                className="menu-item" 
                onClick={() => onSectionChange(4.5)}>
                Contact
            </button>
            </div>
        </div>
        </>
    );
    };
