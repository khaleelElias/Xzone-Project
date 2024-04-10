import React from 'react';
import basketball from '../../public/basketball.jpeg'
import pep from '../../public/pep.png'
import football from '../../public/soccer.png'
const SportsHighlights = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-black">
      <div className="highlight-item">
        <a href="/football" className="block">
          <div className="highlight-img-container relative">
            <img src={football} alt="Football" className="highlight-image" />
            <div className="overlay flex items-center justify-center absolute inset-0 bg-black bg-opacity-50">
              <span className="text-white text-lg">Now</span>
            </div>
          </div>
          <span className="block text-center text-white mt-2">Football</span>
        </a>
      </div>
      <div className="highlight-item">
        <a href="/memecoins" className="block">
          <div className="highlight-img-container relative">
            <img src= {pep} alt="Memecoins" className="highlight-image" />
            <div className="overlay flex items-center justify-center absolute inset-0 bg-pink-600 bg-opacity-50">
              <span className="text-white text-lg">Coming Q2</span>
            </div>
          </div>
          <span className="block text-center text-white mt-2">Memecoins</span>
        </a>
      </div>
      <div className="highlight-item">
        <a href="/basketball" className="block">
          <div className="highlight-img-container relative">
            <img src= {basketball} alt="Basketball" className="highlight-image" />
            <div className="overlay flex items-center justify-center absolute inset-0 bg-yellow-600 bg-opacity-50">
              <span className="text-white text-lg">Coming 2024</span>
            </div>
          </div>
          <span className="block text-center text-white mt-2">Basketball</span>
        </a>
      </div>
    </div>
  );
};

export default SportsHighlights;
