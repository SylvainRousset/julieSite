// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Layout from './components/Layout';
import './Styles/global.scss'; // Assurez-vous que le chemin est correct

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Route de connexion */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          {/* Route d'administration protégée */}
          <Route
            path="/admin"
            element={user ? <AdminPage /> : <Navigate to="/login" />}
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
