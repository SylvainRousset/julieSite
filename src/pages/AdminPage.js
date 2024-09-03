// src/pages/AdminPage.js
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

function AdminPage() {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <div>
      <h2>Page d'Administration</h2>
      <p>Bienvenue sur la page d'administration !</p>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default AdminPage;
