import './Style.css';
import React from 'react';

const Section = (props) => {
    const { children } = props;
  
    return (
      <section className="section">
        {children}
      </section>
    );
  };

export const Interface = () => {
    return (
      <div className="flex flex-col items-center w-screen">
        <AboutSection/>
       <SkillSection/>
        <Section>
          <h1>Projects</h1>
        </Section>
        <Section>
          <h1>Contact us</h1>
        </Section>
      </div>
    );
  };
  
const AboutSection = () => {
    return (
      <Section>
        <div className="about-section">
          <h1>Hello I'm
            <br />
            <span>Axel Gumiit</span>
          </h1>
          <p>
            Currently studying a bachelor degree in Computer<br/>Science
            who aims to bring different skillsets to businesses.
          </p>
          <br />
          <div className='button'>
          <button>Explore projects</button>
          </div>
        </div>
      </Section>
    );
  };

  const SkillBar = ({ title, level }) => {
    return (
      <div className="skill-bar">
        <div className="skill-info">
          <span>{title}</span>
          <span>{level}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${level}%` }}></div>
        </div>
      </div>
    );
  };
  
  const SkillSection = () => {
    const skills = [
      { title: "Three.js", level: 60 },
      { title: "HTML/CSS", level: 70 },
      { title: "Python", level: 40 },
      { title: "C#", level: 50 },
      { title: "Blender", level: 70 },
    ];
  
    const languages = [
      { title: "English", level: 80, },
      { title: "Filipino", level: 90, },
      { title: "Spanish", level: 50,  },
    ];
  
    return (
      <Section>
      
        <div className="skills-container">
        <h1>Skills</h1>
          <h2>Technical Skills</h2>
          {skills.map((skill, index) => (
            <SkillBar key={index} title={skill.title} level={skill.level} />
          ))}
          <h2>Languages</h2>
          {languages.map((language, index) => (
            <SkillBar key={index} title={language.title} level={language.level} />
          ))}
        </div>

      </Section>
    );
  };