import React, { useState, useRef, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './Navbar/Navbar';
import AnmeldeFormular from './Anmeldung/AnmeldeFormular';
import Home from './Home/Home';
import Fotos from './Fotos/Fotos';
import Login from './Login/Login';
import Anmeldungen from './Admin/Anmeldungen/Anmeldungen';



function Navigation() {
  return <Navbar />;
}

function App() {



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Navbar />
                <Home />
              </>
            }
          />
          <Route
            path="/fotos"
            element={
              <>
              <Navbar />
                <Fotos />
              </>
            }
          />
          <Route
            path="/anmeldung"
            element={
              <>
              <Navbar />
                <AnmeldeFormular />
              </>
            }
          />
          <Route
            path="/anmeldungen"
            element={
              <>
              <Navbar />
                <Anmeldungen />
              </>
            }
          />

<Route
            path="/login"
            element={
              <>
              <Navbar />
                <Login />
              </>
            }
          />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;


