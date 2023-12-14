import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnmeldeFormular.scss';

const AnmeldeFormular = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [editedAnmeldung, setEditedAnmeldung] = useState(null);
  const [newAnmeldung, setNewAnmeldung] = useState({
    vorname: '',
    nachname: '',
    anzahlPersonen: 1,
    menuAuswahl: 'Menu1',
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Neue Zustandsvariable

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
  }, [isSubmitted]);

  const handleDeleteAnmeldung = async (anmeldungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Anmeldung löschen möchtest?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3001/anmeldungen/${anmeldungId}`);
        console.log('Anmeldung erfolgreich gelöscht:', response.data);

        const updatedAnmeldungen = submittedData.filter(anmeldung => anmeldung.id !== anmeldungId);
        setSubmittedData(updatedAnmeldungen);
      } catch (error) {
        console.error('Fehler beim Löschen der Anmeldung:', error);
      }
    } else {
      console.log('Löschen abgebrochen.');
    }
  };

  const handleEditAnmeldung = (anmeldung) => {
    setEditedAnmeldung(anmeldung);
  };

  const handleCancelEdit = () => {
    setEditedAnmeldung(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/anmeldungen/${editedAnmeldung.id}`, editedAnmeldung);
      console.log('Anmeldung erfolgreich aktualisiert:', response.data);

      const updatedAnmeldungen = submittedData.map(anmeldung =>
        anmeldung.id === editedAnmeldung.id ? response.data : anmeldung
      );

      setSubmittedData(updatedAnmeldungen);
      setEditedAnmeldung(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Anmeldung:', error);
    }
  };

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
      const response = await axios.post('http://localhost:3001/anmeldungen', newAnmeldung);
      console.log('Anmeldung erfolgreich hinzugefügt:', response.data);

      setSubmittedData([...submittedData, response.data]);
      setNewAnmeldung({
        vorname: '',
        nachname: '',
        anzahlPersonen: 1,
        menuAuswahl: 'Menu1',
      });
      setIsSubmitted(true); // Setze den Anmeldestatus auf true nach erfolgreicher Anmeldung
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Anmeldung:', error);
    }
  };

  return (
    <div>
      <h2>Anmeldeformular</h2>

      {/* Neues Anmeldeformular zum Hinzufügen */}
      <div className='anmelden'>
        {isSubmitted ? (
          <p>VIELEN DANK, DASS DU DICH ANGEMELDET HAST!</p>
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

      {/* Liste der vorhandenen Anmeldungen */}
      <div className="anmeldungen-container">
        {submittedData.map((anmeldung) => (
          <div key={anmeldung.id} className="anmeldung-box">
            <p>Vorname: {anmeldung.vorname}</p>
            <p>Nachname: {anmeldung.nachname}</p>
            <p>Anzahl Personen: {anmeldung.anzahlPersonen}</p>
            <p>Menüauswahl: {anmeldung.menuAuswahl}</p>

            {editedAnmeldung && editedAnmeldung.id === anmeldung.id ? (
              <>
                {/* Hier die bearbeitbaren Formularelemente für die Anmeldung */}
                <button onClick={handleSaveEdit}>Speichern</button>
                <button onClick={handleCancelEdit}>Abbrechen</button>
              </>
            ) : (
              <>
                {/* Hier die nicht bearbeitbaren Anzeigeelemente für die Anmeldung */}
                <button className='delete' onClick={() => handleDeleteAnmeldung(anmeldung.id)}>
                  Löschen
                </button>
                <button className='edit' onClick={() => handleEditAnmeldung(anmeldung)}>
                  Bearbeiten
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnmeldeFormular;
