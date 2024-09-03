import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Déconnexion réussie, redirection vers la page d'accueil...");
      navigate('/'); // Redirige vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Déconnexion
    </button>
  );
}

export default LogoutButton;
