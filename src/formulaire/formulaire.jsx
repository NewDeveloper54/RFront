import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './formulaire.css';

const Formulaire = () => {
  const [participant, setParticipant] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/participants");
        const data = await response.json();
        setParticipant(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des participants:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddParticipant = async () => {
    if (nom && prenom && email) {
      const newParticipant = { nom, prenom, email, gain:"" };
      try {
        const res = await fetch("https://rback-t98q.onrender.com/api/participants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newParticipant)
        });
        const newParticipantFromAPI = await res.json();
        setParticipant((prev) => [newParticipantFromAPI, ...prev]);

              localStorage.setItem("participantEmail", email);
        // Stocke l'email du participant dans le localStorage
        // Après l'ajout, on redirige vers /roulette
        navigate("/roulette");
      } catch (error) {
        console.error("Erreur lors de l'ajout du participant :" + error);
      }
    }
  }


  {/* if(nom && prnom && email) */}


  return (
    <div id="formulaire">
      <div className="container">
        <div className="heading">Informations</div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddParticipant();
          }}
        >
          <div className="input-wrapper">
            <input
              onInput={(e) => setNom(e.target.value)}
              value={nom}
              required
              className={`input`}
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom"
            />
            <span onClick={() => setNom("")} className={`clear-icon ${nom ? "show" : ""}`}>×</span>
          </div>

          <div className="input-wrapper">
            <input
              onInput={(e) => setPrenom(e.target.value)}
              value={prenom}
              required
              className="input"
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prénom"
            />
            <span onClick={() => setPrenom("")} className={`clear-icon ${prenom ? "show" : ""}`}>×</span>
          </div>

          <div className="input-wrapper">
            <input
              required
              onInput={(e) => setEmail(e.target.value)}
              value={email}
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <span onClick={() => setEmail("")} className={`clear-icon ${email ? "show" : ""}`}>×</span>
          </div>

          <input
            className="login-button"
            type="submit"
            value="Valider et passer à la roulette"
          />
        </form>
      </div>
    </div>
  );
};

export default Formulaire;
