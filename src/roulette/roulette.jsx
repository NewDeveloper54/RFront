import React, { useState } from 'react';
import './roulette.css';
import hoody from "../assets/hoodyBG.png";
import trophy from "../assets/trophee.png";

const Roulette = () => {
  const [isDown, setIsDown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const triangles = Array.from({ length: 8 });

  const infos = {
    1: { img: hoody, title: "hoody", class: "hoody" },
    2: { img: trophy, title: "Roi de la journée", class: "trophy" },
    3: { img: hoody, title: "fd", class: "hoody" },
    4: { img: hoody, title: "ffdfd", class: "hoody" },
    5: { img: hoody, title: "fdfdfd", class: "hoody" },
    6: { img: hoody, title: "g", class: "hoody" },
    7: { img: hoody, title: "gggg", class: "hoody" },
    8: { img: hoody, title: "ggggggggggg", class: "hoody" },
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsDown(true);
    setIsSpinning(true);

    const btn = document.querySelector(".lanceButton");
    btn.style.transform = "translateY(60px)";
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
                  <img src={info.img} height="80px" width="80px" alt={`triangle-${i + 1}`} />
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
                  <p className="lose-text">Oops, il n ya rien cette fois</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pointer"></div>
        <button style={{backgroundColor:"red"}} onClick={handleSpin} className={`lanceButton ${isDown}`}>Lancer</button>
      </div>

      {winnerIndex !== null && !isSpinning && (
        <div className="result">
          <h2>Bravo ! Vous avez gagné : {infos[winnerIndex + 1].title}</h2>
        </div>
      )}

      
    </div>
  );
};

export default Roulette;



