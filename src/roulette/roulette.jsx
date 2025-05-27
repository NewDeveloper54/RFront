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

  const segments = Array.from({ length: 16 }); 

  const infos = {
    0: { img: hoody, title: "hoody", class: "hoody" },
    1: { img: surpris, title: "Oops", class: "oops" },
    2: { img: headphones, title: "headphones", class: "headphones" },
    3: { img: surpris, title: "oops", class: "oops" },
    4: { img: hoody, title: "fdfdfd", class: "hoody" },
    5: { img: surpris, title: "oops", class: "oops" },
    6: { img: hoody, title: "g", class: "hoody" } ,
    7: { img: surpris, title: "oops", class: "oops" },
    8: { img: headphones, title: "headphones", class: "headphones" },
    9: { img: surpris, title: "Oops", class: "oops" },
    10: { img: hoody, title: "fdfdfd", class: "hoody" },
    11: { img: surpris, title: "Oops", class: "oops" },
    12: { img: hoody, title: "fdfdfd", class: "hoody" },
    13: { img: surpris, title: "Oops", class: "oops" },
    14: { img: trophy, title: "Roi de la journée", class: "trophy" },
    15: { img: surpris, title: "Oops", class: "oops" } ,
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsDown(true);
    setIsSpinning(true);
    setTimeout(() => {
      setIsShown(isShown === "shown" ? "" : "shown");
    }, 5000);

    const btn = document.querySelector(".lanceButton");
    if (btn) {
      btn.style.opacity = "0";
      btn.style.transition = "1s";
    }

    const randomIndex = Math.floor(Math.random() * 16);
    const anglePerSegment = 360 / 16;
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
            {segments.map((_, i) => {
              const info = infos[i];
              const isLose = i >= 8;
              const angle = i * (360 / 16);
              const translateY = isLose ? 250 : 250;
              const extraStyle = isLose
                ? { transform: `rotate(${angle }deg) translateY(${translateY}px) translateX(-20px)` }
                : { transform: `rotate(${angle  }deg) translateY(${translateY}px) translateX(20px)` };

              return (
                <div
                  className={`triangle ${isLose ? "lose" : ""}`}
                  style={extraStyle}
                  key={i}
                >
                  <div className={isLose ? "shapeLose lose-shape" : "shape"}>
                    <p
                      className={isLose ? "lose-text" : "p"}
                      style={
                        isLose
                          ? {
                              fontSize: "10px",
                              fontWeight: "bold",
                              fontFamily: "arial",
                              width: "50px",
                              textAlign: "center",
                            }
                          : {}
                      }
                    >
                      {info.title}
                    </p>
                    <img
                      src={info.img}
                      height={isLose ? "40px" : "80px"}
                      width={isLose ? "40px" : "80px"}
                      style={isLose ? { transform: "rotate(180deg)", marginBottom: "10px" } : {}}
                      className={info.class}
                      alt={`segment-${i}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pointer"></div>
          <button onClick={handleSpin} className={`lanceButton ${isDown ? "down" : ""}`}>
            Lancer
          </button>
        </div>

        {winnerIndex !== null && !isSpinning && (
          <div className="result">
            <h2>Bravo ! Vous avez gagné : {infos[winnerIndex].title}</h2>
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
