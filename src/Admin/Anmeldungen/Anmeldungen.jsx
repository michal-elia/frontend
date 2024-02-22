import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Anmeldungen.scss';

const Anmeldungen = () => {
  const [anmeldungenData, setAnmeldungenData] = useState([]);
  const [trauungenData, setTrauungenData] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [editedAnmeldung, setEditedAnmeldung] = useState(null);
  const [editedTrauung, setEditedTrauung] = useState(null);

  const fetchAnmeldungen = async () => {
    try {
      const response = await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen');
      console.log('Anmeldungen Response data:', response.data);
      setAnmeldungenData(response.data);
    } catch (error) {
      console.error('Error fetching Anmeldungen data:', error);
    }
  };

  const fetchTrauungen = async () => {
    try {
      const response = await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/trauungen');
      console.log('Trauungen Response data:', response.data);
      setTrauungenData(response.data);
    } catch (error) {
      console.error('Error fetching Trauungen data:', error);
    }
  };

  useEffect(() => {
    fetchAnmeldungen();
    fetchTrauungen();
  }, []);

  const handleDeleteAnmeldung = async (anmeldungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Anmeldung löschen möchtest?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen/${anmeldungId}`);
        console.log('Anmeldung erfolgreich gelöscht:', response.data);
        // Daten erneut abrufen und aktualisieren
        fetchAnmeldungen();
      } catch (error) {
        console.error('Fehler beim Löschen der Anmeldung:', error);
      }
    } else {
      console.log('Löschen abgebrochen.');
    }
  };

  const handleDeleteTrauung = async (trauungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Trauung löschen möchtest?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`https://hochzeit-database-backend.onrender.com/api/v1/trauungen/${trauungId}`);
        console.log('Trauung erfolgreich gelöscht:', response.data);
        // Daten erneut abrufen und aktualisieren
        fetchTrauungen();
      } catch (error) {
        console.error('Fehler beim Löschen der Trauung:', error);
      }
    } else {
      console.log('Löschen abgebrochen.');
    }
  };

  const handleEditAnmeldung = (anmeldung) => {
    setEditedAnmeldung(anmeldung);
  };

  const handleEditTrauung = (trauung) => {
    setEditedTrauung(trauung);
  };

  const handleCancelEdit = () => {
    setEditedAnmeldung(null);
    setEditedTrauung(null);
  };

  const handleSaveEditAnmeldung = async () => {
    try {
      const response = await axios.put(`https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen/${editedAnmeldung.id}`, editedAnmeldung);
      console.log('Anmeldung erfolgreich aktualisiert:', response.data);
      // Daten erneut abrufen und aktualisieren
      fetchAnmeldungen();
      setEditedAnmeldung(null); // Bearbeitungsmodus beenden
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Anmeldung:', error);
    }
  };

  const handleSaveEditTrauung = async () => {
    try {
      const response = await axios.put(`https://hochzeit-database-backend.onrender.com/api/v1/trauungen/${editedTrauung.id}`, editedTrauung);
      console.log('Trauung erfolgreich aktualisiert:', response.data);
      // Daten erneut abrufen und aktualisieren
      fetchTrauungen();
      setEditedTrauung(null); // Bearbeitungsmodus beenden
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Trauung:', error);
    }
  };

  const handleInputChangeAnmeldung = (e) => {
    const { name, value } = e.target;
    setEditedAnmeldung(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChangeTrauung = (e) => {
    const { name, value } = e.target;
    setEditedTrauung(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const countMenuSelections = (menuSelection) => {
    return anmeldungenData.data.filter(anmeldung => anmeldung.menuAuswahl === menuSelection).length;
  };

  return (
    <div className='anmeldungen'>
      <h2>Alle Anmeldungen</h2>
      {/* Liste der vorhandenen Anmeldungen */}

      <div className="anmeldungen-container">
        {anmeldungenData.data && anmeldungenData.data.map((anmeldung) => (
          <div key={anmeldung.id} className="anmeldung-box">
            {editedAnmeldung && editedAnmeldung.id === anmeldung.id ? (
              <div>
                <input type="text" name="vorname" value={editedAnmeldung.vorname} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="nachname" value={editedAnmeldung.nachname} onChange={handleInputChangeAnmeldung} />
                <input type="number" name="anzahlPersonen" value={editedAnmeldung.anzahlPersonen} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="menuAuswahl" value={editedAnmeldung.menuAuswahl} onChange={handleInputChangeAnmeldung} />
                <button onClick={handleSaveEditAnmeldung}>Speichern</button>
                <button onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {anmeldung.vorname}</p>
                <p>Nachname: {anmeldung.nachname}</p>
                <p>Anzahl Personen: {anmeldung.anzahlPersonen}</p>
                <p>Menüauswahl: {anmeldung.menuAuswahl}</p>
                <button onClick={() => handleEditAnmeldung(anmeldung)}>Bearbeiten</button>
                <button onClick={() => handleDeleteAnmeldung(anmeldung.id)}>Löschen</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />

      <h2>Alle Anmeldungen Trauung</h2>
      <div className="trauung">
        {trauungenData.data && trauungenData.data.map((trauung) => (
          <div key={trauung.id} className="anmeldung-box">
            {editedTrauung && editedTrauung.id === trauung.id ? (
              <div>
                <input type="text" name="vorname" value={editedTrauung.vorname} onChange={handleInputChangeTrauung} />
                <input type="text" name="nachname" value={editedTrauung.nachname} onChange={handleInputChangeTrauung} />
                <input type="number" name="anzahlPersonen" value={editedTrauung.anzahlPersonen} onChange={handleInputChangeTrauung} />
                <button onClick={handleSaveEditTrauung}>Speichern</button>
                <button onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {trauung.vorname}</p>
                <p>Nachname: {trauung.nachname}</p>
                <p>Anzahl Personen: {trauung.anzahlPersonen}</p>
                <button onClick={() => handleEditTrauung(trauung)}>Bearbeiten</button>
                <button onClick={() => handleDeleteTrauung(trauung.id)}>Löschen</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showSummary && (
        <div className="zusammenfassung">
          <h3>Zusammenfassung der Anmeldungen</h3>
          <p>
            Gesamtanzahl Anmeldungen: {anmeldungenData.data.length}
          </p>
          <p>
            Anzahl Lasagne mit Fleisch: {countMenuSelections('Lasagne mit Fleisch')}
          </p>
          <p>
            Anzahl Lasagne mit Gemüse: {countMenuSelections('Lasagne mit Gemüse')}
          </p>
        </div>
      )}

      {!showSummary && (
        <button onClick={handleShowSummary}>Zusammenfassung anzeigen</button>
      )}
    </div>
  );
};

export default Anmeldungen;
