import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrauungFormular.scss';

const TrauungFormular = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [editedTrauung, setEditedTrauung] = useState(null);
  const [newTrauung, setNewTrauung] = useState({
    vorname: '',
    nachname: '',
    anzahlPersonen: 1,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null); // Zustandsvariable für Fehler

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/trauungen')).data;
        console.log('Response data:', response.data);
        setSubmittedData(response.data);
        setError(null); // Fehler zurücksetzen, wenn die Verbindung erfolgreich hergestellt wird
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'); // Fehler setzen, wenn ein Fehler auftritt
      }
    };

    fetchData();
  }, [isSubmitted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrauung((prevTrauung) => ({
      ...prevTrauung,
      [name]: value,
    }));
  };

  const handleAddTrauung = async () => {
    try {
      const response = (await axios.post('https://hochzeit-database-backend.onrender.com/api/v1/trauungen', newTrauung)).data;
      console.log('Anmeldung erfolgreich hinzugefügt:', response.data);

      setSubmittedData([...submittedData, response.data]);
      setNewTrauung({
        vorname: '',
        nachname: '',
        anzahlPersonen: 1,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Anmeldung:', error);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'); // Fehler setzen, wenn ein Fehler auftritt
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>} {/* Fehlermeldung anzeigen, wenn ein Fehler auftritt */}
      <h2>Anmeldeformular</h2>

      <div className='trauung'>
        {isSubmitted ? (
          <p>VIELEN DANK, DASS DU DICH ANGEMELDET HAST!</p>
        ) : (
          <>
            <label>Vorname:</label>
            <input type="text" name="vorname" value={newTrauung.vorname} onChange={handleInputChange} required disabled={!!error} />

            <label>Nachname:</label>
            <input type="text" name="nachname" value={newTrauung.nachname} onChange={handleInputChange} required disabled={!!error} />

            <label>Anzahl Personen:</label>
            <input type="number" name="anzahlPersonen" value={newTrauung.anzahlPersonen} onChange={handleInputChange} required disabled={!!error} />

            <button onClick={handleAddTrauung} className='anmeldenbutton' disabled={!!error}>
              Hinzufügen
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrauungFormular;
