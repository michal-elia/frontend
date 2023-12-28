import React, { useState } from 'react';
import './Fotos.scss';
import FotoBild from './kuss.jpg';

// Importiere die Bilder als Objekte mit zusätzlichen Informationen
import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import image4 from './images/4.jpg';
import image5 from './images/5.jpg';
import image6 from './images/6.jpg';
import image7 from './images/7.jpg';
import image8 from './images/8.jpg';
import image9 from './images/9.jpg';
import image10 from './images/10.jpg';
import image11 from './images/11.jpg';



const imageList = [
  { id: 1, src: image1, alt: 'image1' },
  { id: 2, src: image2, alt: 'image2' },
  { id: 3, src: image3, alt: 'image3' },
  { id: 4, src: image4, alt: 'image4' },
  { id: 5, src: image5, alt: 'image5' },
  { id: 6, src: image6, alt: 'image6' },
  { id: 7, src: image7, alt: 'image7' },
  { id: 8, src: image8, alt: 'image8' },
  { id: 9, src: image9, alt: 'image9' },
  { id: 10, src: image10, alt: 'image10' },
  { id: 11, src: image11, alt: 'image11' },
];


const Fotos = () => {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleFullscreen = (image) => {
    setFullscreenImage(image === fullscreenImage ? null : image);
  };

  return (
    <div className='image-container'>
      <img src={FotoBild} alt="Brautpaar" className="FotoBild" />
      <div className='images-boxes'>
        <h1>Hier kommen die Fotos hin!</h1>

        <div className="gallery">
          {imageList.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="image"
              onClick={() => toggleFullscreen(image)}
            />
          ))}
        </div>
      </div>

      {fullscreenImage && (
        <div className="fullscreen" onClick={() => toggleFullscreen(null)}>
          <div className="fullscreen-container">
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.alt}
              className="fullscreen-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Fotos;
