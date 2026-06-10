import React, { useState, useEffect } from 'react';
import './Home.scss';

interface ImageSliderProps {
  images: string[];
  interval?: number; // Time between transitions in ms
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, interval = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="banner_inner">
      <div className="sliderBox">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={index === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;