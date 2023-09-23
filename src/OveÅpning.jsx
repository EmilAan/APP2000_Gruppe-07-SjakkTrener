// Laget av Endre Kvam

import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { listeMedTrekk } from "./integrations/moves.js";
import ChessBoard from "./integrations/ChessBoard";
import { getUser } from "./TermsOfServices.jsx";
import axios from "axios";
import Confetti from "react-confetti";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import { useNavigate } from "react-router-dom";

const OveÅpning = () => {

  // useState hooks, jeg ser nå at openings og åpninger kan virke forvirrende
  // openings er en liste med kun åpningsnavn og populerer dropdownlisten
  // åpninger er en liste med all data til åpningene knyttet til brukeren

  const [openings, setOpenings] = useState([]);
  const [username, setUsername] = useState("");
  const [åpninger, setÅpninger] = useState([]);
  const [chessboardPosition, setChessboardPosition] = useState("start");
  const [resetChessboard, setResetChessboard] = useState(false);
  const [valgtÅpning, setValgtÅpning] = useState("");
  const [fenListe, setFenListe] = useState([]);
  const [melding, setMelding] = useState("");

  // Resetter listeMedTrekk, ellers ville trekk fra Game og LagÅpning fortsatt vært der
  // Henter også brukernavn, henter åpninger og setter melding til bruker til ""
  // useEffecten kjører kun en gang, når siden refreshes
  useEffect(() =>{
    listeMedTrekk.length = 0;
    hentBruker();
    hentÅpninger();
    setMelding("");
  }, []);

  // Henter brukernavn
  const hentBruker = async () => {
    try {
      const userData = await getUser(username);
      if (userData && userData.username) {
        setUsername(userData.username);
      } else {
        console.log("Brukernavn ikke funnet.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Henter åpninger
  const hentÅpninger = async () => {
    try {
      const response = await axios.get("http://localhost:4000/hentAapninger");
      const fetchedOpenings = response.data;
      setÅpninger(fetchedOpenings); // legger inn åpningene i "åpninger"
      setOpenings(fetchedOpenings.map((åpning) => åpning.åpningsNavn)); // legger inn kun åpningsnavn i "openings" 
    } catch (error) {
      console.log(error);
    }
  };

  // Legger til åpninger i dropdownlisten
  const optionElements = [];
  for (let i = 0; i < openings.length; i++) {
    if (åpninger[i].username === username) {
      const option = openings[i];
      optionElements.push(<option key={i} value={option}>{option}</option>);
    }
  }

  // Setter valgt åpning og henter listen med FEN-strings til åpningen
  const håndtereListeValg = (event) => {
    const selectedÅpning = event.target.value;
    setValgtÅpning(selectedÅpning);
  
    const matchendeÅpning = åpninger.find((åpning) => åpning.åpningsNavn === selectedÅpning && åpning.username === username);
    if (matchendeÅpning) {
      const matchendeFENs = matchendeÅpning.trekkListe;
      setFenListe(matchendeFENs);
    } else {
      setFenListe([]);
    }
  };

  // Sjekker om bruker har valgt åpning, deretter om trekket er riktig
  // Dersom trekket er riktig, sjekker den om brukeren har fullført åpningen
  // Hvis trekket er feil, resetter den brettet og gir bruker beskjed om at trekket er feil
  const sjekk = () => {
    setTimeout(() => {
      const lengde = fenListe.length;
      if (valgtÅpning !== "") {
        if (listeMedTrekk[listeMedTrekk.length - 1] !== fenListe[listeMedTrekk.length - 1]) {
          setMelding("Feil trekk");
          setChessboardPosition("start");
          setResetChessboard(true);
          listeMedTrekk.length = 0;
        } else {
          if (listeMedTrekk.length === lengde) {
            setMelding("Du har fullført åpningen!");
          } else if (listeMedTrekk.length !== 0){
          setMelding("Riktig trekk");
          }
        }
      } else {
          setMelding("Velg åpning");
          setChessboardPosition("start");
          setResetChessboard(true);
          listeMedTrekk.length = 0;
      }
    }, 100); // Kort delay for å sørge for at listeMedTrekk blir populert
  };

  // Sletter åpning
  const slettÅpning = async () => {
    const confirmed = window.confirm("Er du sikker? Åpningen din blir slettet for alltid.");
    if (!confirmed) {
      return; // Brukeren kansellerte slettingen
    } else {
      try {
        axios({
          method: "post",
          data: {
            username: username,
            åpningsNavn: valgtÅpning
          },
          withCredentials: true,
          //bruk denne ved hosting
          url: "/slettÅpning",
    
          //bruk denne for å kjøre lokalt
          url: "http://localhost:4000/slettAapning",
        }).then((res) => {
          window.location.reload() // Refresher siden
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  // Resetter brettet dersom man velger ny åpning
  useEffect(() => {
    setChessboardPosition("start");
    setResetChessboard(true);
    listeMedTrekk.length = 0; // Resetter listen med trekk gjort av bruker
    setMelding(""); // Resetter melding til bruker
  }, [valgtÅpning]);

  useEffect(() => {
    if (resetChessboard) {
      setResetChessboard(false); // setter resetChessboard til false igjen
    }
  }, [resetChessboard]);

  // Bruker kan slette åpning kun når åpning er valg, ser nå at denne burde hete "kanIkkeSlette"
  // Dette funker, men kan være litt forvirrende å lese
  const kanSlette = valgtÅpning === "";

  const naviger = () => {
    navigate("/lagAapning");
  }
  // Brukes for å navigere frem og tilbake fra øving til laging av åpning, ligger i begge filene
  const navigate = useNavigate();
  return (
    <>
      <NavbarAuthenticated />
      <div>
        {melding === "Du har fullført åpningen!" && <Confetti />}
      </div>
      
      <div className="text-center">
        <h1
          className={` text-3xl font-semibold bg-slate-200 ${
           valgtÅpning ? "text-purple-600" : ""
          }`}
        >
          {valgtÅpning || "Velg en åpning"}
        </h1>
      </div>
     
      <div className=" md:flex md:justify-center mt-3">
        <div className="grid items-center md:grid md:grid-cols-1 items p-4 mx-4 w-52">
          <h2 className="text-2xl font-semibold mb-1 text-center">Dine åpninger:</h2>
          <select
            id="liste"
            className="bg-slate-200 text-center" 
            onChange={håndtereListeValg}
            value={valgtÅpning}
          >
            <option disabled value="">
              -- velg en åpning --
            </option>
            {optionElements}
          </select>
          <div id="øveMelding"> {/*} Sjekker om melding er lik fullført åpning, viser "melding" kun da {*/}
            <div className="mt-10 mb-10 text-2xl font-semibold bg-slate-200
                        rounded-lg border h-28 text-center whitespace-break-spaces w-auto">
              <p className={`${melding === "Du har fullført åpningen!" ? "text-green-600" : ""}`}> 
              {melding}
              </p>
            </div>
          </div>
          <button className="w-max rounded px-12 py-2 font-bold duration-300 bg-yellow-500 hover:bg-yellow-300"
          onClick={naviger}>
          Lag åpning
          </button>
          <button className={` flexrounded font-bold duration-300 px-4 py-4 ${
              kanSlette
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-400 text-black hover:bg-red-500" 
            }`}
            onClick={slettÅpning}
            disabled={kanSlette}
            >
            Slett åpning
          </button>
        </div>
          <div onDrop={sjekk}>
            <ChessBoard
              key={resetChessboard ? "reset" : chessboardPosition}
              position={chessboardPosition}
            />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OveÅpning;
