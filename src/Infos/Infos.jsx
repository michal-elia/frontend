
import React from 'react';
import './Infos.scss';
import Park from './images/Parkplätze.png';

const Infos = () => {
  return (
    <div className="container">
      <div className='info-container'>
        <div className='info-text'>
          <h1>Hier findest du wichtige Informationen!</h1>
          <img src={Park} alt="Parkplätze" className="imported-image" />
        </div>
      </div>
    </div>
  );
};

export default Infos;