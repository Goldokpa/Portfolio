import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';
import './About.css';

const About = ({ onClose }) => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-name">Gold Ogike Emmanuel Okpa</h1>
          <div className="about-question">In what profound ways might the goodwill of artificial intelligence guide humanity toward a more harmonious and enlightened existence?</div>
        </div>

        <div className="about-content">
          <div className="profile-section">
            <div className="profile-picture">
              <img 
                src="/images/profile.jpg" 
                alt="Gold Ogike Emmanuel Okpa" 
                className="profile-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x400?text=Profile+Image';
                }}
              />
            </div>
          </div>

          <div className="info-section">
            <div className="about-email">
              <span>Email: </span>
              <a href="mailto:okpagold@gmail.com">okpagold@gmail.com</a>
            </div>

            <div className="about-text">
              <p className="work-info">
                Currently working at <a href="https://www.rezonata.xyz/" target="_blank" rel="noopener noreferrer">Rezonate Labs Inc.</a>
              </p>
              
              <p>
                Most recently, I built an Ai Agent that is used for Orthopedic care at <a href="#">Clinix Ai</a>.
              </p>
              
              <p>
              Just prior to that, I aligned my expertise with a passionate team dedicated to transforming how young Nigerians engage with technological innovation <a href="https://3mtt.nitda.gov.ng/" target="_blank" rel="noopener noreferrer">3MTT</a>.
              </p>

              <p> 
                I also have experience in management and leadership roles where i was leading teams and driving projects to success at <a href="#">Betigol Company Ltd</a>.
              </p>
              
              <p>
                I studied Computer Engineering at Northampton University, coming from a background in Electrical 
                Electronics Engineering at Madonna University Nigeria.
              </p>
              
              <p>
                My journey in tech began during my high school days in Makurdi, Nigeria, where I discovered 
                my passion for technology with competitive science background being the window to a 
                globally oriented mindset.
              </p>
            </div>

            <div className="social-links">
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="Resume" className="resume-icon">
                📄
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
