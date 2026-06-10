
// LogoCarousel.tsx
import React from 'react';
import './LogoSlider.scss'

import { Images } from '../utils';

const partnerLogos = [
    {
      id: 1,
      name: 'NVIDIA',
      src: Images.logo_Nvidia,
      alt: 'NVIDIA logo'
    },
    {
      id: 2,
      name: 'Google for Startups',
      src: Images.logo_google,
      alt: 'Google for Startups'
    },
    {
      id: 3,
      name: 'Plug and Play',
      src: Images.logo_pp,
      alt: 'Plug and Play logo'
    },
    {
      id: 4,
      name: 'MIT Media Lab',
      src: Images.logo_mit,
      alt: 'MIT Media Lab logo'
    },
    {
      id: 5,
      name: 'Kumbhathon',
      src: Images.logo_kumbat,
      alt: 'Kumbhathon logo'
    },
    {
      id: 6,
      name: 'Privado',
      src: Images.logo_privado,
      alt: 'Example Partner 1 logo'
    },
    {
      id: 7,
      name: 'Center',
      src: Images.logo_center,
      alt: 'Example Partner 2 logo'
    },
    {
        id: 8,
        name: 'Center',
        src: Images.logo_optimis,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 9,
        name: 'Center',
        src: Images.logo_mai,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 10,
        name: 'Center',
        src: Images.logo_tech,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 11,
        name: 'Center',
        src: Images.logo_qore,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 12,
        name: 'Center',
        src: Images.logo_ytel,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 13,
        name: 'Center',
        src: Images.logo_mbanq,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 14,
        name: 'Center',
        src: Images.logo_cold,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 15,
        name: 'Center',
        src: Images.logo_pegasus,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 16,
        name: 'Center',
        src: Images.logo_digitech,
        alt: 'Example Partner 2 logo'
    },
    {
        id: 17,
        name: 'Center',
        src: Images.logo_235,
        alt: 'Example Partner 2 logo'
    },{
        id: 18,
        name: 'Center',
        src: Images.logo_guidewire,
        alt: 'Example Partner 2 logo'
    },{
        id: 19,
        name: 'Center',
        src: Images.logo_teai,
        alt: 'Example Partner 2 logo'
    },{
        id: 20,
        name: 'Center',
        src: Images.logo_fdppi,
        alt: 'Example Partner 2 logo'
    },{
        id: 21,
        name: 'Center',
        src: Images.logo_bharatweb3,
        alt: 'Example Partner 2 logo'
    },{
        id: 22,
        name: 'Center',
        src: Images.logo_fit4,
        alt: 'Example Partner 2 logo'
    }
  ];


const LogoSlider: React.FC = () => {
  // Duplicate logos to create a seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];
  
  return (
    <div className="logo-carousel-container">
      <h2 className="carousel-title">Recognized by Industry Leaders & Trusted by Top Enterprises</h2>
      
      <div className="logo-carousel">
        <div className="logo-track">
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="logo-item">
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSlider;