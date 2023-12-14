import React, { useState, useEffect } from 'react';
import './Home.scss';
import HomeBild from './zusammen.jpg';

const Home = () => {
  const targetDate = new Date('2024-08-24T00:00');
  const [countdown, setCountdown] = useState(0);

  const calculateCountdown = () => {
    const now = new Date();
    const remainingTime = targetDate.getTime() - now.getTime();

    if (remainingTime <= 0) {
      setCountdown(0);
    } else {
      setCountdown(Math.floor(remainingTime / 1000));
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(countdown / (24 * 60 * 60));
  const hours = Math.floor((countdown % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return (
    <div className="container">
      <img src={HomeBild} alt="Brautpaar" className='HomeBild' />
      

      <div className="countdown-container">
        <div className="countdown-element">
          <div className="countdown-value">{days}</div>
          <div className="countdown-label">{days === 1 ? 'Tag' : 'Tage'}</div>
        </div>
        <div className="countdown-element">
          <div className="countdown-value">{hours}</div>
          <div className="countdown-label">Stunden</div>
        </div>
        <div className="countdown-element">
          <div className="countdown-value">{minutes}</div>
          <div className="countdown-label">Minuten</div>
        </div>
        <div className="countdown-element">
          <div className="countdown-value">{seconds}</div>
          <div className="countdown-label">Sekunden</div>
        </div>
      </div>
      <h1>Willkommen zu Hause!</h1>
      <p>Dies ist die Startseite Ihrer Anwendung.</p>
      <p>Genießen Sie Ihren Aufenthalt!</p>
    </div>
  );
};

export default Home;  