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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/trauungen')).data;
        console.log('Response data:', response.data);
        setSubmittedData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    }
  };

  return (
    <div>
      <h2>Anmeldeformular</h2>

      <div className='trauung'>
        {isSubmitted ? (
          <p>VIELEN DANK, DASS DU DICH ANGEMELDET HAST!</p>
        ) : (
          <>
            <label>Vorname:</label>
            <input type="text" name="vorname" value={newTrauung.vorname} onChange={handleInputChange} required />

            <label>Nachname:</label>
            <input type="text" name="nachname" value={newTrauung.nachname} onChange={handleInputChange} required />

            <label>Anzahl Personen:</label>
            <input type="number" name="anzahlPersonen" value={newTrauung.anzahlPersonen} onChange={handleInputChange} required />

            <button onClick={handleAddTrauung} className='anmeldenbutton'>
              Hinzufügen
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrauungFormular;
