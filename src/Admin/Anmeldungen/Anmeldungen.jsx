import React, { useState } from 'react';
import './Anmeldungen.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// JSON Daten für Anmeldungen und Trauungen
const anmeldungenData = [
  { "id": 40, "vorname": "Ursula und Claudio", "nachname": "Ziroma", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 43, "vorname": "Elisabeth + Samuel", "nachname": "Hostettler", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 44, "vorname": "Michal", "nachname": "Gilgen", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 46, "vorname": "Elia", "nachname": "Hänni", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 47, "vorname": "Matheo", "nachname": "Niederhäuser", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 48, "vorname": "Timo", "nachname": "Blumer", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 49, "vorname": "Marcel", "nachname": "Gilgen", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 50, "vorname": "Zoe", "nachname": "Gilgen", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 51, "vorname": "Evelyne", "nachname": "Gilgen", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 52, "vorname": "Lionel", "nachname": "Gilgen", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 53, "vorname": "Sven", "nachname": "Freiburghaus", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 54, "vorname": "Janine", "nachname": "von Felten", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 55, "vorname": "Svenja", "nachname": "Schneider", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 57, "vorname": "Valerie & Simon", "nachname": "Mardones", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 58, "vorname": "Joana", "nachname": "Röthlisberger", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 59, "vorname": "Mattia", "nachname": "Ziroma", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 60, "vorname": "Rolf und Manuela", "nachname": "Blumer", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 62, "vorname": "Jonathan", "nachname": "Niederhäuser", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 64, "vorname": "Noël", "nachname": "Blumer", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 65, "vorname": "Jannik und Seraina", "nachname": "Hunziker / Good", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 66, "vorname": "Erwin und Susanne", "nachname": "Hänni", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 68, "vorname": "Ueli-Ätti & Silvia", "nachname": "Hugi", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 70, "vorname": "Franziska", "nachname": "Hänni", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 71, "vorname": "Svenja", "nachname": "Hofer", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 72, "vorname": "Amy", "nachname": "Bestler", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 73, "vorname": "Lisa", "nachname": "Zaugg", "anzahl": 3, "essen": "Lasagne mit Fleisch" },
  { "id": 74, "vorname": "Damaris", "nachname": "Büschlen", "anzahl": 5, "essen": "Lasagne mit Fleisch" },
  { "id": 75, "vorname": "Joela, Rafael, Tobias, Janine, Thomas", "nachname": "Meiers", "anzahl": 5, "essen": "Lasagne mit Fleisch" },
  { "id": 76, "vorname": "Ilenja", "nachname": "Tobler", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 77, "vorname": "Joanna", "nachname": "Schmid", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 78, "vorname": "Michael und Elina", "nachname": "Schmid", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 79, "vorname": "Lars", "nachname": "Dänzer", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 80, "vorname": "Robin", "nachname": "Hänni", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 81, "vorname": "Reto", "nachname": "Hänni", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 82, "vorname": "Jvan", "nachname": "Fioretti", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 83, "vorname": "Felix", "nachname": "Buchser", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 84, "vorname": "Andrew", "nachname": "Gopalakrishnan", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 85, "vorname": "Bonita", "nachname": "Meyer", "anzahl": 6, "essen": "Lasagne mit Fleisch" },
  { "id": 86, "vorname": "Andreas", "nachname": "Weber", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 87, "vorname": "Andrea", "nachname": "Weber", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 88, "vorname": "Levi", "nachname": "Hänni", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 89, "vorname": "Nadja & Mario", "nachname": "Nowak", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 90, "vorname": "Lois", "nachname": "Becher", "anzahl": 1, "essen": "Lasagne mit Gemüse" },
  { "id": 91, "vorname": "Elena", "nachname": "Ziroma", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 92, "vorname": "Kezia", "nachname": "Meier", "anzahl": 2, "essen": "Lasagne mit Fleisch" },
  { "id": 93, "vorname": "Severin", "nachname": "Marthaler", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 94, "vorname": "Steven", "nachname": "Okoro", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 95, "vorname": "Jamie", "nachname": "Fiechter", "anzahl": 1, "essen": "Lasagne mit Fleisch" },
  { "id": 96, "vorname": "Arnold und Monique", "nachname": "Flury", "anzahl": 2, "essen": "Lasagne mit Fleisch" }
];

const trauungenData = [
  { "id": 35, "vorname": "Anina", "nachname": "Lempen", "anzahl": 1 },
  { "id": 46, "vorname": "Simona", "nachname": "Kohli", "anzahl": 2 },
  { "id": 48, "vorname": "Mirjam und Basil", "nachname": "Binkert", "anzahl": 5 },
  { "id": 49, "vorname": "Lara", "nachname": "Aeschbacher", "anzahl": 1 },
  { "id": 50, "vorname": "Mia", "nachname": "Anderegg", "anzahl": 1 },
  { "id": 52, "vorname": "Jacqueline", "nachname": "Wenger", "anzahl": 1 },
  { "id": 53, "vorname": "Josha", "nachname": "Röthlisberger", "anzahl": 1 },
  { "id": 54, "vorname": "Sibylle & Stefan", "nachname": "Hänni / Rüegseggee", "anzahl": 2 },
  { "id": 55, "vorname": "Caroline", "nachname": "Keller", "anzahl": 1 },
  { "id": 56, "vorname": "Celina", "nachname": "Landolt", "anzahl": 1 },
  { "id": 57, "vorname": "Colleen", "nachname": "Tschanz", "anzahl": 1 },
  { "id": 58, "vorname": "Sarah", "nachname": "Bach", "anzahl": 1 },
  { "id": 59, "vorname": "Nadia", "nachname": "Shabani", "anzahl": 4 },
  { "id": 60, "vorname": "Esther", "nachname": "Bernhard", "anzahl": 1 },
  { "id": 62, "vorname": "Cornelia", "nachname": "Jenni", "anzahl": 1 }
];


const Anmeldungen = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [editedAnmeldung, setEditedAnmeldung] = useState(null);
  const [editedTrauung, setEditedTrauung] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteAnmeldung = (anmeldungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Anmeldung löschen möchtest?');

    if (isConfirmed) {
      const updatedAnmeldungen = anmeldungenData.filter(anmeldung => anmeldung.id !== anmeldungId);
      // Hier könntest du den state oder die Datenquelle aktualisieren
      console.log("Updated Anmeldungen:", updatedAnmeldungen);
    }
  };

  const handleDeleteTrauung = (trauungId) => {
    const isConfirmed = window.confirm('Bist du sicher, dass du diese Trauung löschen möchtest?');

    if (isConfirmed) {
      const updatedTrauungen = trauungenData.filter(trauung => trauung.id !== trauungId);
      // Hier könntest du den state oder die Datenquelle aktualisieren
      console.log("Updated Trauungen:", updatedTrauungen);
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

  const handleSaveEditAnmeldung = () => {
    // Implementiere hier die Speicherlogik für bearbeitete Anmeldungen
    console.log("Gespeicherte Anmeldung:", editedAnmeldung);
    setEditedAnmeldung(null);
  };

  const handleSaveEditTrauung = () => {
    // Implementiere hier die Speicherlogik für bearbeitete Trauungen
    console.log("Gespeicherte Trauung:", editedTrauung);
    setEditedTrauung(null);
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
    return anmeldungenData.filter(anmeldung => anmeldung.essen === menuSelection).length;
  };

  const countTotalAnmeldungen = () => {
    return anmeldungenData.reduce((total, anmeldung) => total + anmeldung.anzahl, 0);
  };

  const countTrauungPersons = () => {
    return trauungenData.reduce((total, trauung) => total + trauung.anzahl, 0);
  };

  const countTotalPersons = () => {
    return countTotalAnmeldungen() + countTrauungPersons();
  };

  const filteredAnmeldungen = anmeldungenData.filter(anmeldung =>
    anmeldung.vorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    anmeldung.nachname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrauungen = trauungenData.filter(trauung =>
    trauung.vorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trauung.nachname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='anmeldungen'>
      <h2>Alle Anmeldungen</h2>
      <input
        type="text"
        placeholder="Suche nach Vorname oder Nachname"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="anmeldungen-container">
        {filteredAnmeldungen.map((anmeldung) => (
          <div key={anmeldung.id} className="anmeldung-box">
            {editedAnmeldung && editedAnmeldung.id === anmeldung.id ? (
              <div>
                <input type="text" name="vorname" value={editedAnmeldung.vorname} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="nachname" value={editedAnmeldung.nachname} onChange={handleInputChangeAnmeldung} />
                <input type="number" name="anzahl" value={editedAnmeldung.anzahl} onChange={handleInputChangeAnmeldung} />
                <input type="text" name="essen" value={editedAnmeldung.essen} onChange={handleInputChangeAnmeldung} />
                <button className="save-button" onClick={handleSaveEditAnmeldung}>Speichern</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {anmeldung.vorname}</p>
                <p>Nachname: {anmeldung.nachname}</p>
                <p>Anzahl: {anmeldung.anzahl}</p>
                <p>Essen: {anmeldung.essen}</p>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditAnmeldung(anmeldung)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteAnmeldung(anmeldung.id)} />
              </div>
            )}
          </div>
        ))}
      </div>

      <hr />

      <h2>Alle Trauungen</h2>
      <div className="anmeldungen-container">
        {filteredTrauungen.map((trauung) => (
          <div key={trauung.id} className="anmeldung-box">
            {editedTrauung && editedTrauung.id === trauung.id ? (
              <div>
                <input type="text" name="vorname" value={editedTrauung.vorname} onChange={handleInputChangeTrauung} />
                <input type="text" name="nachname" value={editedTrauung.nachname} onChange={handleInputChangeTrauung} />
                <input type="number" name="anzahl" value={editedTrauung.anzahl} onChange={handleInputChangeTrauung} />
                <button className="save-button" onClick={handleSaveEditTrauung}>Speichern</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Abbrechen</button>
              </div>
            ) : (
              <div>
                <p>Vorname: {trauung.vorname}</p>
                <p>Nachname: {trauung.nachname}</p>
                <p>Anzahl: {trauung.anzahl}</p>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => handleEditTrauung(trauung)} />
                <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeleteTrauung(trauung.id)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {showSummary && (
        <div className="zusammenfassung">
          <h2>Zusammenfassung</h2>
          <p>Gesamte Anmeldungen: {countTotalAnmeldungen()}</p>
          <p>Lasagne mit Fleisch: {countMenuSelections('Lasagne mit Fleisch')}</p>
          <p>Lasagne mit Gemüse: {countMenuSelections('Lasagne mit Gemüse')}</p>
          <p>Gesamte Trauungspersonen: {countTrauungPersons()}</p>
          <p>Gesamte Teilnehmer: {countTotalPersons()}</p>
        </div>
      )}

      <button onClick={handleShowSummary}>Zusammenfassung anzeigen</button>
    </div>
  );
};

export default Anmeldungen;
