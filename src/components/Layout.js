import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../Styles/Layout.scss'; // Assurez-vous que le chemin est correct

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children} {/* Ajoutez ceci pour rendre le contenu enfant */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;