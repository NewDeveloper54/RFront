import React from 'react';
import Roulette from "./roulette/roulette";
import Formulaire from "./formulaire/formulaire"; 
import Joueurs from "./joueurs/joueurs";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Formulaire />} />
      <Route path="/roulette" element={<Roulette />} />
      <Route path="/joueurs" element={<Joueurs />} />
    </Routes>
  );
};

export default App;
