import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // Verhindert die Standardaktion des Formulars (Seitenneuladung)

    // Hier sollte die Authentifizierungslogik implementiert werden
    // Zum Beispiel: Überprüfe Benutzername und Passwort mit einer Serveranfrage

    // Dummy-Überprüfung
    if (username === 'Gast' && password === '240824') {
      setLoggedIn(true);
      window.location = "/anmeldungen"
      alert('Login erfolgreich!');
    } else {
      alert('Falscher Benutzername oder Passwort.');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <p>Du bist eingeloggt!</p>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Benutzername:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Passwort:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Einloggen</button>
        </form>
      )}
    </div>
  );
};

export default Login;
