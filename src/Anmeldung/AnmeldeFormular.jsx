import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnmeldeFormular.scss';

const AnmeldeFormular = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [newAnmeldung, setNewAnmeldung] = useState({
    vorname: '',
    nachname: '',
    anzahlPersonen: 1,
    menuAuswahl: 'Lasagne mit Fleisch',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null); // Zustand für Fehler

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen');
        console.log('Response data:', response.data);
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Fehler: Bitte versuchen Sie es später erneut!'); // Fehler setzen
      }
    };

    fetchData();
  }, [isSubmitted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnmeldung((prevAnmeldung) => ({
      ...prevAnmeldung,
      [name]: value,
    }));
  };

  const handleMenuChange = (e) => {
    setNewAnmeldung((prevAnmeldung) => ({
      ...prevAnmeldung,
      menuAuswahl: e.target.value,
    }));
  };

  const handleAddAnmeldung = async () => {
    try {
      const response = await axios.post('https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen', newAnmeldung);
      console.log('Anmeldung erfolgreich hinzugefügt:', response.data);

      setSubmittedData((prevSubmittedData) => {
        const newData = Array.isArray(prevSubmittedData) ? prevSubmittedData : [];
        return [...newData, response.data];
      });

      setNewAnmeldung({
        vorname: '',
        nachname: '',
        anzahlPersonen: 1,
        menuAuswahl: 'Menu1',
      });
      setIsSubmitted(true);

      // Dankesmeldung für 5 Sekunden anzeigen
      window.alert('Vielen Dank, dass du dich angemeldet hast!');
      setTimeout(() => {
        setIsSubmitted(false);
        window.location = "/";
      }, 0); // Keine Verzögerung

    } catch (error) {
      console.error('Fehler beim Hinzufügen der Anmeldung:', error);
      setError('Fehler: Bitte versuchen Sie es später erneut!'); // Fehler setzen
    }
  };

  return (
    <div>
      <h2>Anmeldeformular</h2>

      <div className='anmelden'>
        {error ? ( // Überprüfen Sie, ob ein Fehler aufgetreten ist
          <p style={{ color: 'red', backgroundColor: 'white' }}>{error}</p>
        ) : (
          <>
            <label>Vorname:</label>
            <input type="text" name="vorname" value={newAnmeldung.vorname} onChange={handleInputChange} required />

            <label>Nachname:</label>
            <input type="text" name="nachname" value={newAnmeldung.nachname} onChange={handleInputChange} required />

            <label>Anzahl Personen:</label>
            <input type="number" name="anzahlPersonen" value={newAnmeldung.anzahlPersonen} onChange={handleInputChange} required />

            <label>Menu Auswahl:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="Lasagne mit Fleisch"
                  checked={newAnmeldung.menuAuswahl === 'Lasagne mit Fleisch'}
                  onChange={handleMenuChange}
                  className='menuAuswahl'
                  required
                />
                Lasagne mit Fleisch
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="Lasagne mit Gemüse"
                  checked={newAnmeldung.menuAuswahl === 'Lasagne mit Gemüse'}
                  onChange={handleMenuChange}
                  required
                />
                Lasagne mit Gemüse
              </label>
            </div>

            <button onClick={handleAddAnmeldung} className='anmeldenbutton'>Hinzufügen</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnmeldeFormular;
