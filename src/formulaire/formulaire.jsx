import React, {useState} from 'react';
import './formulaire.css';
 import { Link } from 'react-router-dom';
  

const Formulaire = () => {

const[nom, setNom] =useState("");
const[prenom, setPrenom] =useState("");
const[email, setEmail] =useState("");









  return (
    <div id="formulaire">
      <div className="container">
        <div className="heading">Informations</div>
        <form action="" className="form">

          <div className="input-wrapper">
          <input  onInput={(e)=>{  setNom(e.target.value);}} value={nom} required className={`input`} type="text" name="nom" id="nom" placeholder="Nom" />
  <span   onClick={()=>{setNom("")}} className={`clear-icon  ${nom? "show" : ""}`}>×</span>
</div> 



                    <div className="input-wrapper">
                    <input onInput={(e)=>{  setPrenom(e.target.value);}} value={prenom}  required className="input" type="text" name="prenom" id="prenom" placeholder="Prénom" />
  <span onClick={()=>{setPrenom("")}} className={`clear-icon  ${prenom? "show" : ""}`}>×</span>
</div> 

<div className="input-wrapper">
  <input required onInput={(e)=>{  setEmail(e.target.value);}} value={email} className="input" type="email" name="email" id="email" placeholder="Email" />
  <span onClick={()=>{setEmail("")}} className={`clear-icon  ${email? "show" : ""}`}>×</span>
</div>         



<Link to="/roulette">
          <input className="login-button" type="submit" value="Valider et passer à la roulette" />
          </Link>
 
        </form>

        


        
      </div>
    </div>
  );
};

export default Formulaire;
