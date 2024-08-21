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
        <Section>
          <h1>Skills</h1>
        </Section>
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
          <button>Contact me</button>
          </div>
        </div>
      </Section>
    );
  };