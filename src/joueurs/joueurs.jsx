import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './joueurs.css';

const Joueurs = () => {
  const [joueurs, setJoueurs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJoueurs = async () => {
      try {
        const response = await fetch("https://rback-t98q.onrender.com/api/participants");
        const data = await response.json();
        setJoueurs(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des joueurs :", error);
      }
    };

    fetchJoueurs();
  }, []);

  return (
    <div className="joueurs-page">
      <button className="retour-btn" onClick={() => navigate('/')}>
        Retour au formulaire
      </button>
      <div className="container-joueurs">
        <h2 style={{ color: "#fff", textAlign: "center" }}>Liste des joueurs</h2>
        <table className="joueurs-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Gain</th>
            </tr>
          </thead>
          <tbody className='tbody-joueurs'>
            {joueurs.map((joueur, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{joueur.nom}</td>
                <td>{joueur.prenom}</td>
                <td>{joueur.email}</td>
                <td>{joueur.gain || "Pas encore gagné"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Joueurs;
