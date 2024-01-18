import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Anmeldungen = () => {
  const [anmeldungenData, setAnmeldungenData] = useState([]);
  const [trauungenData, setTrauungenData] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [editedAnmeldung, setEditedAnmeldung] = useState(null);

  useEffect(() => {
    const fetchAnmeldungen = async () => {
      try {
        const response = await axios.get('http://localhost:3001/anmeldungen');
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

        if (Array.isArray(response.data)) {
          setTrauungenData(response.data);
        } else {
          console.error('Invalid data structure for Trauungen:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Trauungen data:', error);
      }
    };

    fetchAnmeldungen();
    fetchTrauungen();
  }, []);

  const handleDeleteAnmeldung = async (anmeldungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Anmeldung löschen möchtest?');

    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3001/anmeldungen/${anmeldungId}`);
        console.log('Anmeldung erfolgreich gelöscht:', response.data);

        const updatedAnmeldungen = anmeldungenData.filter(anmeldung => anmeldung.id !== anmeldungId);
        setAnmeldungenData(updatedAnmeldungen);
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

      const updatedAnmeldungen = anmeldungenData.map(anmeldung =>
        anmeldung.id === editedAnmeldung.id ? response.data : anmeldung
      );

      setAnmeldungenData(updatedAnmeldungen);
      setEditedAnmeldung(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Anmeldung:', error);
    }
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const countMenuSelections = (menuSelection) => {
    return anmeldungenData.filter(anmeldung => anmeldung.menuAuswahl === menuSelection).length;
  };

  return (
    <div className='anmeldungen'>
      <h2>Alle Anmeldungen</h2>
      {/* Liste der vorhandenen Anmeldungen */}
      <div className="anmeldungen-container">
        {anmeldungenData.map((anmeldung) => (
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

      <hr />

      <h2>Alle Anmeldungen Trauung</h2>
      <div className="trauung">
        {trauungenData.map((trauung) => (
          <div key={trauung.id} className="anmeldung-box">
            <p>Vorname: {trauung.vorname}</p>
            <p>Nachname: {trauung.nachname}</p>
            <p>Anzahl Personen: {trauung.anzahlPersonen}</p>

            {editedAnmeldung && editedAnmeldung.id === trauung.id ? (
              <>
                {/* Hier die bearbeitbaren Formularelemente für die Anmeldung */}
                <button onClick={handleSaveEdit}>Speichern</button>
                <button onClick={handleCancelEdit}>Abbrechen</button>
              </>
            ) : (
              <>
                {/* Hier die nicht bearbeitbaren Anzeigeelemente für die Anmeldung */}
                <button className='delete' onClick={() => handleDeleteAnmeldung(trauung.id)}>
                  Löschen
                </button>
                <button className='edit' onClick={() => handleEditAnmeldung(trauung)}>
                  Bearbeiten
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {showSummary && (
        <div className="zusammenfassung">
          <h3>Zusammenfassung der Anmeldungen</h3>
          <p>
            Gesamtanzahl Anmeldungen: {anmeldungenData.length}
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
