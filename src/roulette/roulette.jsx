import React, { useState } from 'react';
import './roulette.css';
import hoody from "../assets/hoodyBG.png";
import trophy from "../assets/trophee.png";
import headphones from "../assets/headphones.png";
import surpris from "../assets/surpris.png";
import { Link } from 'react-router-dom';


const Roulette = () => {

    const [isShown, setIsShown] = useState("");




  const [isDown, setIsDown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const triangles = Array.from({ length: 8 });

  const infos = {
    1: { img: hoody, title: "hoody", class: "hoody" },
    2: { img: trophy, title: "Roi de la journée", class: "trophy" },
    3: { img: headphones, title: "headphones", class: "headphones" },
    4: { img: surpris, title: "oops", class: "oops" },
    5: { img: hoody, title: "fdfdfd", class: "hoody" },
    6: { img: hoody, title: "g", class: "hoody" },
    7: { img: hoody, title: "gggg", class: "hoody" },
    8: { img: hoody, title: "ggggggggggg", class: "hoody" },
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsDown(true);
    setIsSpinning(true);
    setTimeout(() => {

    setIsShown(isShown === "shown" ? "" : "shown");

    },5000);


    


    

    const btn = document.querySelector(".lanceButton");
    btn.style.opacity = "0";
    btn.style.transition = "1s";

    const randomIndex = Math.floor(Math.random() * 8);
    const anglePerSegment = 360 / 8;
    const newRotation = 360 * 5 + (360 - randomIndex * anglePerSegment);

    setRotation(newRotation);
    setWinnerIndex(randomIndex);

    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div id="roulette">
        <div className="cicleInfo">
      <div className="circleWrapper">
        <div
          className="circle"
          style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 4s ease-out' }}
        >
          {triangles.map((_, i) => {
            const info = infos[i + 1];
            return (
              <div
                className="triangle"
                style={{ transform: `rotate(${i * 45}deg) translateY(230px)` }}
                key={i}
              >
                <div className="shape">
                  <p className="p">{info.title}</p>
                  <img src={info.img} height="80px" width="80px" className={info.class} alt={`triangle-${i + 1}`} />
                </div>
              </div>
            );
          })}




          {triangles.map((_, i) => {
            const angle = i * 45 + 22.5; 
            return (
              <div
                className="triangle lose"
                style={{ transform: `rotate(${angle}deg) translateY(250px) translateX(-20px)` }}
                key={`lose-${i}`}
              >
                <div className="shapeLose lose-shape">
                  <p style={{fontSize:"10px",fontWeight:"bold",fontFamily:"arial", width:"50px", textAlign:"center"}} className="lose-text">Oops</p>
                  <img style={{transform:"rotate(180deg)", marginBottom:"10px"}} src={surpris} height="40px" width="40px" alt="" />

                </div>
              </div>
            );
          })}
        </div>


        <div className="pointer"></div>
        <button onClick={handleSpin} className={`lanceButton  ${isDown}`}>Lancer</button>
      </div>

      {winnerIndex !== null && !isSpinning && (
        <div className="result">
          <h2>Bravo ! Vous avez gagné : {infos[winnerIndex + 1].title}</h2>
        </div>
      )}
<Link className="rouleteLink" to="/">
        <button className={`rouletteBtn ${isShown}`}>back</button>
      </Link>

      </div>
      
    </div>
  );
};

export default Roulette;



