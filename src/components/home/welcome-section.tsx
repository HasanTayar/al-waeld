import React from 'react';
import '@/styles/home/WelcomeSection.scss'; 
import welcomeImage from '/assets/welcomeImage.jpg'
// WelcomeSection component
export const WelcomeSection = ({ title, description }:{title?:string , description?:string}) => {
    return (
      <div className="welcome-section">
        <img src={welcomeImage} alt="Family in a field" className="image-full blur-sm" />
        <div className="text-overlay">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    );
  };
  


