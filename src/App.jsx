import React from 'react';
import Roulette from "./roulette/roulette";
import Formulaire from "./formulaire/formulaire"; 
import {Routes, Route} from "react-router-dom";




const App = ()=>{
  return (
<Routes>
  <Route path="/" element={<Formulaire/>} />
  <Route path="/roulette" element={<Roulette/>} />
</Routes>


)
};



export default App;