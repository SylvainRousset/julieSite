import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import PastryCarousel from '../components/PastryCarousel';
import HeroCarousel from '../components/HeroCarousel'; // Import du nouveau carrousel
import EditModal from '../components/EditModal';
import Presentation from '../components/Presentation'; // Import du composant Presentation
import '../Styles/Home.scss';

// Importation des images
import image1 from '../assets/locaux2.jpg';
import image2 from '../assets/locaux3.jpg';

function Home() {
  const [pastries, setPastries] = useState([]);
  const [partyItems, setPartyItems] = useState([]); // Ajout d'un état pour les pièces de fête
  const [isPastryModalOpen, setIsPastryModalOpen] = useState(false); // État pour la modal des pâtisseries
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false); // État pour la modal des pièces de fête
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  // Authentification utilisateur
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Récupérer les pâtisseries de la collection 'images'
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

  // Récupérer les pièces de fête de la collection 'party'
  useEffect(() => {
    const fetchPartyItems = async () => {
      const partyCollection = collection(db, 'party');
      const partySnapshot = await getDocs(partyCollection);
      const partyList = partySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPartyItems(partyList);
    };

    fetchPartyItems();
  }, []);

  // Supprimer une pâtisserie ou une pièce de fête
  const handleDelete = async (id, imageUrl, collectionName) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);

      if (collectionName === 'images') {
        setPastries(pastries.filter(pastry => pastry.id !== id));
      } else if (collectionName === 'party') {
        setPartyItems(partyItems.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément :', error);
    }
  };

  // Ajouter une pâtisserie ou une pièce de fête
  const handleAdd = async ({ title, price, image, ingredients }, collectionName) => {
    try {
      const storageRef = ref(storage, `${collectionName}/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const newItem = {
        title,
        price: parseFloat(price),
        image_url: imageUrl,
        ingredients,
      };

      const docRef = await addDoc(collection(db, collectionName), newItem);

      if (collectionName === 'images') {
        setPastries([...pastries, { id: docRef.id, ...newItem }]);
      } else if (collectionName === 'party') {
        setPartyItems([...partyItems, { id: docRef.id, ...newItem }]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'élément :', error);
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
      src: image1,
      alt: 'Description de l\'image 1',
      title1: ' "La vie est incertaine. Mangez le dessert en premier."',
      title2: 'Ernestine Ulmer',
      description: '',
    },
    {
      src: image2,
      alt: 'Description de l\'image 2',
      title1: "\"S'ils n'ont pas de pain, qu'ils mangent de la brioche !\"",
      title2: 'Marie Antoinette ',
      description: '',
    },
  ];

  return (
    <div className="home">
      <HeroCarousel slides={heroSlides} />
      
      {/* Section de présentation */}
      <Presentation />

      {/* Carrousel des pâtisseries */}
      <section id="pastries" className="pastries-section">
        <h2 className="section-title">
          <span>LES</span>
          <span>PÂTISSERIES</span>
        </h2>
        <PastryCarousel key="carousel-patisseries" pastries={pastries} />
        {user && (
          <div className="admin-controls">
            <button className="edit-btn" onClick={() => setIsPastryModalOpen(true)}>Modifier Pâtisseries</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        )}
      </section>

      {/* Carrousel des pièces de fête */}
      
      <section id="party" className="pastries-section">
        <h2 className="section-title">
          <span>Douceurs des </span>
          <span>grandes occasions</span>
        </h2>
        <PastryCarousel key="carousel-party" pastries={partyItems} />
        {user && (
          <div className="admin-controls">
            <button className="edit-btn" onClick={() => setIsPartyModalOpen(true)}>Modifier Pièces de Fête</button>
            <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
          </div>
        )}
      </section>

      {/* Modal pour les pâtisseries */}
      <EditModal
        isOpen={isPastryModalOpen}
        onRequestClose={() => setIsPastryModalOpen(false)}
        pastries={pastries}
        onDelete={(id, imageUrl) => handleDelete(id, imageUrl, 'images')}
        onAdd={(data) => handleAdd(data, 'images')}
      />

      {/* Modal pour les pièces de fête */}
      <EditModal
        isOpen={isPartyModalOpen}
        onRequestClose={() => setIsPartyModalOpen(false)}
        pastries={partyItems}
        onDelete={(id, imageUrl) => handleDelete(id, imageUrl, 'party')}
        onAdd={(data) => handleAdd(data, 'party')}
      />
    </div>
  );
}

export default Home;
