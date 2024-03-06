import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Anmeldungen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Anmeldungen = () => {
  const [anmeldungenData, setAnmeldungenData] = useState([]);
  const [trauungenData, setTrauungenData] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [editedAnmeldung, setEditedAnmeldung] = useState(null);
  const [editedTrauung, setEditedTrauung] = useState(null);

  const fetchAnmeldungen = async () => {
    try {
      const response = await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen');
      setAnmeldungenData(response.data);
    } catch (error) {
      console.error('Error fetching Anmeldungen data:', error);
    }
  };

  const fetchTrauungen = async () => {
    try {
      const response = await axios.get('https://hochzeit-database-backend.onrender.com/api/v1/trauungen');
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
        await axios.delete(`https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen/${anmeldungId}`);
        fetchAnmeldungen();
      } catch (error) {
        console.error('Fehler beim Löschen der Anmeldung:', error);
      }
    }
  };

  const handleDeleteTrauung = async (trauungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Trauung löschen möchtest?');

    if (isConfirmed) {
      try {
        await axios.delete(`https://hochzeit-database-backend.onrender.com/api/v1/trauungen/${trauungId}`);
        fetchTrauungen();
      } catch (error) {
        console.error('Fehler beim Löschen der Trauung:', error);
      }
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
      await axios.put(`https://hochzeit-database-backend.onrender.com/api/v1/anmeldungen/${editedAnmeldung.id}`, editedAnmeldung);
      fetchAnmeldungen();
      setEditedAnmeldung(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Anmeldung:', error);
    }
  };

  const handleSaveEditTrauung = async () => {
    try {
      await axios.put(`https://hochzeit-database-backend.onrender.com/api/v1/trauungen/${editedTrauung.id}`, editedTrauung);
      fetchTrauungen();
      setEditedTrauung(null);
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

  const countTotalAnmeldungen = () => {
    return anmeldungenData.data.reduce((total, anmeldung) => total + parseInt(anmeldung.anzahlPersonen), 0);
  };

  const countTrauungPersons = () => {
    return trauungenData.data.reduce((total, trauung) => total + parseInt(trauung.anzahlPersonen), 0);
  };

  const countTotalPersons = () => {
    return countTotalAnmeldungen() + countTrauungPersons();
  };

  return (
    <div className='anmeldungen'>
      <h2>Alle Anmeldungen</h2>

      <div className="anmeldungen-container">
        {anmeldungenData.data && anmeldungenData.data.map((anmeldung) => (
          <div key={anmeldung.id} className="anmeldung-box">
            {editedAnmeldung && editedAnmeldung.id === anmeldung.id ? (
              <div>
                <input type="text" name="vorname" value={editedAnmeldung.vorname} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="nachname" value={editedAnmeldung.nachname} onChange={handleInputChangeAnmeldung} />
                <input type="number" name="anzahlPersonen" value={editedAnmeldung.anzahlPersonen} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="menuAuswahl" value={editedAnmeldung.menuAuswahl} onChange={handleInputChangeAnmeldung} />
                <button className="save-button" onClick={handleSaveEditAnmeldung}>Speichern</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {anmeldung.vorname}</p>
                <p>Nachname: {anmeldung.nachname}</p>
                <p>Anzahl Personen: {anmeldung.anzahlPersonen}</p>
                <p>Menüauswahl: {anmeldung.menuAuswahl}</p>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditAnmeldung(anmeldung)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteAnmeldung(anmeldung.id)} />
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />

      <h2>Alle Anmeldungen Trauung</h2>
      <div className="anmeldungen-container">
        {trauungenData.data && trauungenData.data.map((trauung) => (
          <div key={trauung.id} className="anmeldung-box">
            {editedTrauung && editedTrauung.id === trauung.id ? (
              <div>
                <input type="text" name="vorname" value={editedTrauung.vorname} onChange={handleInputChangeTrauung} />
                <input type="text" name="nachname" value={editedTrauung.nachname} onChange={handleInputChangeTrauung} />
                <input type="number" name="anzahlPersonen" value={editedTrauung.anzahlPersonen} onChange={handleInputChangeTrauung} />
                <button className="save-button" onClick={handleSaveEditTrauung}>Speichern</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {trauung.vorname}</p>
                <p>Nachname: {trauung.nachname}</p>
                <p>Anzahl Personen: {trauung.anzahlPersonen}</p>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditTrauung(trauung)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteTrauung(trauung.id)} />
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
          <h3>Zusammenfassung der Trauungen</h3>
          <p>
            Gesamtanzahl Personen bei Trauungen: {countTrauungPersons()}
          </p>
          <h3>Gesamtanzahl Personen</h3>
          <p>
            Gesamtanzahl Personen: {countTotalPersons()}
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
