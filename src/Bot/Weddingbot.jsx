import React from 'react';
import './Weddingbot.scss';
import foto from './weddingembot.JPG';

const Weddingbot = () => {
  return (
    <div className="wedding-container">
      <div className="image-container">
        <img src={foto} alt="Placeholder" />
      </div>
    </div>
  );
};

export default Weddingbot;
