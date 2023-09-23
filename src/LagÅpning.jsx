// Laget av Endre Kvam
// Redesignet av Philip og Emil, slik at den skal bli så brukervennlig som mulig

import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import ChessBoard from "./integrations/ChessBoard";
import { listeMedTrekk } from "./integrations/moves.js";
import axios from "axios";
import { getUser } from "./TermsOfServices.jsx";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import { useNavigate } from "react-router-dom";

// Side for å lage åpninger
const LagÅpning = () => {

  const [username, setUsername] = useState("");
  const [åpningsNavn, setÅpningsNavn] = useState("");
  const [trekkListe, setTrekkListe] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Tømmer listeMedTrekk, ellers ville trekk fra Game og ØveÅpning fortsatt vært i den
  // Kjøres hver gang bruker refresher siden
  useEffect(() => {
    listeMedTrekk.length = 0;
  }, []);

  let loginUsername;
  let loginEmail;

  // Henter brukernavn, setter i state "username"
  useEffect(() => {
    const hentBruker = async () => {
      try {
        const userData = await getUser(loginUsername, loginEmail); // henter også email, noe som ikke er nødvendig,
        if (userData && userData.username) {                       // ettersom brukernavn er unikt
          setUsername(userData.username);
        } 
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    hentBruker();
  }, [loginUsername, loginEmail]);

  // Sjekker om trekklisten er tom, hvis ikke kjøres lagreÅpning()
  // kjøres kun når trekklisten endres, denne endres kun når bruker trkker på "lagre åpning"
  // Litt forvirrende, kunne vært løst på en bedre måte
  useEffect(() => {
    if (trekkListe.length !== 0) {
      lagreÅpning();
    }
  }, [trekkListe]);

  // Lagrer åpning i databasen med spørring til backend
  const lagreÅpning = () => {
    axios({
      method: "post",
      data: {
        username: username,
        åpningsNavn: åpningsNavn,
        trekk: trekkListe,
      },
      withCredentials: true,
      //bruk denne for å kjøre på server
      //url: "/lagreAapning",
      //bruk denne for å kjøre lokalt
      url: "http://localhost:4000/lagreAapning"
    }).then((res) => {
      setShowSuccessMessage(true); // Viser suksessmelding
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
    });
  };

  // Henter åpninger fra databasen med spørring til backend
  function lagreNyÅpning(){
    fetchOpenings();
  }
  // Setter navn på åpning før det sendes til databasen
  const handleInput = (event) => {
    const value = event.target.value;
    setÅpningsNavn(value);
  };

  // Sjekker om åpningen allerede finnes i databasen, sjekker kun brukernavn og åpningsnavn, ikke FEN-Strings
  const fetchOpenings = async () => {
      try {
        const response = await axios.get("http://localhost:4000/hentAapninger");
        const fetchedOpenings = response.data;
      
        const bruker = username;
        const åpning = åpningsNavn;

        // sjekk om åpningen eksisterer på brukeren
        const openingExists = fetchedOpenings.some(
        (opening) =>
        opening.username === bruker && opening.åpningsNavn === åpning
        );

        if (openingExists) {
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false); // Gjemmer errormelding etter 3 sekunder
        }, 3000);
      } else {
        setTrekkListe(listeMedTrekk); // populerer trekkListe
        }
      } catch (error) {
        console.log(error);
      }
    };

  const isButtonDisabled = åpningsNavn === "" || listeMedTrekk.length === 0;
  // funksjon for å navigere til øveåpning 
  const naviger = () => {
    navigate("/oveaapning");
  }

  const navigate = useNavigate();

  return (
    <>
      <NavbarAuthenticated />
      <h1 className="py-2 text-center text-3xl font-semibold">
        Lag din egen åpning
      </h1>
      <div className="mt-2 flex justify-around">
        <div className="flex gap-14 px-4">
          <input
            type="navn"
            placeholder="Gi navn til åpningen"
            onChange={handleInput}
            className="bg-white-400 rounded-lg border text-center"
          />
           <button
            className={`rounded px-12 py-2 font-bold duration-300 ${ // Styling om knappen er disabled eller ikke
              isButtonDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-yellow-500 text-black hover:bg-yellow-300"
            }`}
            onClick={lagreNyÅpning}
            disabled={isButtonDisabled} // Knappen kan kun brukes når navnfelt er fylt ut
          >
            Lagre åpning
          </button>
        </div>
      </div>
      {showSuccessMessage && (
        <div className="text-center mt-4 text-green-500 text-2xl">
          Åpning lagret! Siden oppdateres om 3 sekunder.
        </div>
      )}
      {showErrorMessage && (
        <div className="text-center mt-4 text-red-500 text-2xl">
          Du har allerede en åpning med samme navn!
        </div>
      )}
      <div className=" md:flex md:justify-center mt-4">
      <div className="flex flex-col items-center justify-center">
        <button className="rounded px-12 py-2 font-bold duration-300 bg-yellow-500 hover:bg-yellow-300 h-auto"
        onClick={naviger}>
        Prøv åpninger
        </button>
        </div>
        <ChessBoard />
      </div>
      <Footer />
    </>
  );
};

export default LagÅpning;


