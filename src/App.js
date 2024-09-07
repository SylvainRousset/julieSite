import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Layout from './components/Layout';
import './Styles/global.scss';
import React, { useState, useEffect } from 'react';

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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
