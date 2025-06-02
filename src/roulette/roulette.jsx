import React, { useEffect, useState } from 'react';
import './roulette.css';
import hoody from "../assets/hoodieBG.png";
import trophy from "../assets/trophee.png";
import headphones from "../assets/headphones.png";
import surpris from "../assets/surpris.png";
import tShirt from "../assets/t-shirt.png";
import mug from "../assets/mug.png";
import socks from "../assets/socks.png";
import cup from "../assets/cup.png";
import chapeau from "../assets/chapeau.png";
import { Link } from 'react-router-dom';
import pointer from "../assets/pointer.png";

const Roulette = () => {





  const [isShown, setIsShown] = useState("");
  const [isShown2, setIsShown2] = useState("");
  const [isDown, setIsDown] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const triangles = Array.from({ length: 16 }); 

  const infos = {
    0: { img: hoody, title: "hoody", class: "hoody" },
    1: { img: surpris, title: "Oops", class: "oops" },
    2: { img: headphones, title: "casque", class: "headphones" },
    3: { img: surpris, title: "Oops", class: "oops" },
    4: { img: tShirt, title: "t-shirt", class: "tShirt" },
    5: { img: surpris, title: "Oops", class: "oops" },
    6: { img: cup, title: "goblet", class: "cup" } ,
    7: { img: surpris, title: "Oops", class: "oops" },
    8: { img: chapeau, title: "chapeau", class: "chapeau" },
    9: { img: surpris, title: "Oops", class: "oops" },
    10: { img: mug, title: "tasse", class: "mug" },
    11: { img: surpris, title: "Oops", class: "oops" },
    12: { img: socks, title: "chaussettes", class: "socks", pclass: "psocks" },
    13: { img: surpris, title: "Oops", class: "oops" },
    14: { img: trophy, title: "Roi de la journée", class: "trophy" },
    15: { img: surpris, title: "Oops", class: "oops" } ,
  };

  const [value, setValue] = useState("");

{/* useEffect(() => {
  const current = infos[winnerIndex];

  if (!current) return; 

  if (current.title === "Oops") {
    setValue("Dommage pour cette fois!");
  } else {
    setValue(`Vous avez gagné : ${current.title}`);
  }
}, [winnerIndex]);  */}


useEffect(() => {
  const current = infos[winnerIndex];

  if (!current) return;

  let gainText = "";
  let gainToSend = "";

  if (current.title === "Oops") {
    gainText = "Oops, vous n'avez pas ganné cette fois-ci!";
    gainToSend = "OOps, vous n'avez pas gagné cette fois-ci!";
  } else {
    gainText = `Vous avez gagné : ${current.title}`;
    gainToSend = current.title;
  }

  setValue(gainText);

  // Envoi vers le backend
  const email = localStorage.getItem("participantEmail");
  if (email) {
    fetch(`https://rback-t98q.onrender.com/api/participants/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gain: gainToSend }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Participant mis à jour avec gain :", data);
      })
      .catch((err) => {
        console.error("Erreur mise à jour gain :", err);
      });
  }
}, [winnerIndex]);






  const handleSpin = () => {
    if (isSpinning) return;

  
    setIsDown(true);
    setIsSpinning(true);
    setTimeout(() => {
      setIsShown(isShown === "shown" ? "" : "shown");
    }, 5000);


   setTimeout(() => {
  setIsShown2(isShown2 === "show" ? "" : "show"); 
}, 200);

    const btn = document.querySelector(".lanceButton");
    if (btn) {
      btn.style.opacity = "0";
      btn.style.transition = "0.5s";
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
            {triangles.map((_, i) => {
              const info = infos[i];
              const isLose = i % 2 ===1;
              const angle = i * (360 / 16);
              const translateY = isLose ? 250 : 250;
              const extraStyle = isLose
                ? { transform: `rotate(${angle}deg) translateY(${translateY}px) translateX(-20px)` }
                : { transform: `rotate(${angle}deg) translateY(${translateY}px) translateX(20px)` };

              return (
                <div
                  className={`triangle ${isLose ? "lose" : ""}`}
                  style={extraStyle}
                  key={i}

                >
                  <div className={isLose ? "shapeLose lose-shape" : "shape"}>
                    <p
className={`${isLose ? "lose-text" : "p"} ${info.pclass}`}
                      style={
                        isLose
                          ? {
                            transform: "rotate(180deg)",
                              fontSize: "10px",
                              fontWeight: "bold",
                              fontFamily: "arial",
                              width: "50px",
                              textAlign: "center",
                            }
                          : { 
                                                        transform: "rotate(180deg)",

                            fontSize: "10px",
                              fontWeight: "bold",
                              fontFamily: "arial",
                              width: "40px",
                              textAlign: "center",
                              
                           }
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
          <img 
  className={`pointerImg ${isShown2}`}
           src={pointer} alt="" />
        </div>

        {winnerIndex !== null && !isSpinning && (
          <div className="result">
            
            <h2
            style={{fontFamily:"arial", color:"white",  height:"100px", display:"flex", alignItems:"end"}}> {value}  </h2>
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
