import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anmeldungen = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/anmeldungen');
        console.log('Response data:', response.data);
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const countMenuSelections = (menuSelection) => {
    return submittedData.filter(anmeldung => anmeldung.menuAuswahl === menuSelection).length;
  };

  return (
    <div className='anmeldungen'>
      <h2>Alle Anmeldungen</h2>
      <div className="anmeldungen-container">
        {submittedData.map((anmeldung) => (
          <div key={anmeldung.id} className="anmeldung-box">
            <p>Vorname: {anmeldung.vorname}</p>
            <p>Nachname: {anmeldung.nachname}</p>
            <p>Anzahl Personen: {anmeldung.anzahlPersonen}</p>
            <p>Menüauswahl: {anmeldung.menuAuswahl}</p>
          </div>
        ))}
      </div>

      {showSummary && (
        <div className="zusammenfassung">
          <h3>Zusammenfassung</h3>
          <p>
            Gesamtanzahl Anmeldungen: {submittedData.length}
          </p>
          <p>
            Anzahl Lasagne mit Fleisch: {countMenuSelections('Lasagne mit Fleisch')}
          </p>
          <p>
            Anzahl Lasagne mit Gemüse: {countMenuSelections('Lasagne mit Gemüse')}
          </p>
          {/* Hier könntest du weitere Zusammenfassungsinformationen hinzufügen */}
        </div>
      )}

      {!showSummary && (
        <button onClick={handleShowSummary}>Zusammenfassung anzeigen</button>
      )}
    </div>
  );
};

export default Anmeldungen;
