// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import PastryCarousel from '../components/PastryCarousel';
import HeroCarousel from '../components/HeroCarousel'; // Import du nouveau carrousel
import EditModal from '../components/EditModal';
import '../Styles/Home.scss';


// Importation des images
import image1 from '../assets/locaux2.jpg'; // Assurez-vous que ce chemin est correct
import image2 from '../assets/locaux3.jpg'; // Assurez-vous que ce chemin est correct
function Home() {
  const [pastries, setPastries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchPastries = async () => {
      const pastriesCollection = collection(db, 'images');
      const pastrySnapshot = await getDocs(pastriesCollection);
      const pastryList = pastrySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPastries(pastryList);
    };

    fetchPastries();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    try {
      await deleteDoc(doc(db, 'images', id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      setPastries(pastries.filter(pastry => pastry.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la pâtisserie :', error);
    }
  };

  const handleAdd = async ({ title, price, image }) => {
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const newPastry = {
        title,
        price: parseFloat(price),
        image_url: imageUrl,
      };

      const docRef = await addDoc(collection(db, 'images'), newPastry);
      setPastries([...pastries, { id: docRef.id, ...newPastry }]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la pâtisserie :', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirige vers la page d'accueil après la déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  const heroSlides = [
    {
      src: image1, // Remplacez par vos URLs d'images
      alt: 'Description de l\'image 1',
      title1: 'Titre Principal 1',
      title2: 'Sous-titre 1',
      description: 'Description de l\'image 1',
    },
    {
      src: image2, // Remplacez par vos URLs d'images
      alt: 'Description de l\'image 2',
      title1: 'Titre Principal 2',
      title2: 'Sous-titre 2',
      description: 'Description de l\'image 2',
    },
    // Ajoutez plus de diapositives si nécessaire
  ];

  return (
    <div className="home">
      <HeroCarousel slides={heroSlides} /> {/* Nouveau carrousel d'images */}
      <section id="pastries" className="pastries-section">
        <h2 className="section-title">
          <span>LES</span>
          <span>PATISSERIES</span>
        </h2>
        <PastryCarousel pastries={pastries} />
        {user && (
          <div className="admin-controls">
            <button className="edit-btn" onClick={() => setIsModalOpen(true)}>Modifier</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        )}
      </section>

      <EditModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        pastries={pastries}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
    </div>
  );
}

export default Home;
