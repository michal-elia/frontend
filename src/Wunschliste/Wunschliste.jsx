import React from 'react';
import wunschliste from "./wunschliste.pdf";
import './wunschliste.scss';

const Wunschliste = () => {
  

  

  const downloadPDF = () => {
    // Pfad zur PDF-Datei
    const pdfFilePath = wunschliste;
    // Erzeugt einen Link mit der PDF-Datei
    const link = document.createElement('a');
    link.href = pdfFilePath;
    // Stellt den Namen der Datei ein, wie sie beim Herunterladen angezeigt wird
    link.download = 'wunschliste.pdf';
    // Fügt den Link zum Dokument hinzu und klickt ihn an
    document.body.appendChild(link);
    link.click();
    // Entfernt den Link nach dem Herunterladen
    document.body.removeChild(link);
  };

  return (
    <div className='wunsch-container'>
      <h2>Wunschliste</h2>
      <div className="pdf-container">
        <iframe src={wunschliste} title="Wunschliste PDF" className="pdf-viewer" />
      </div>
      <button onClick={downloadPDF}>Download als PDF</button>
    </div>
  );
};

export default Wunschliste;
