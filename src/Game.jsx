import { useEffect, useState, React } from "react";
import Footer from "./components/Footer";
import ChessBoard from "./integrations/ChessBoard";
import { useNavigate } from "react-router-dom";
import { listeMedTrekk } from "./integrations/moves";
import axios from "axios";
import GameNotAuthenticated from "./components/GameNotAuthenticated";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

const Game = () => {
const [loginStatus, setLoginStatus] = useState("");
const navigate = useNavigate();
axios.defaults.withCredentials = true;

  // Tømmer liste med trekk når bruker navigerer til siden
  function TømListe() {
    useEffect(() => {
      listeMedTrekk.length = 0;
    }, []);
  }

  TømListe();
  // Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar, 
  // og redirecte til forsiden dersom bruker ikke er logget inn
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
      //console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        //console.log(user);
        setLoginStatus(user);
        if(loginStatus === false) {
          navigate("/");
        }
      }
    });
  }, [loginStatus]);

  return (
    <>
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}
      <h1 className="py-2 text-center text-3xl font-semibold">Tren på sjakk med deg selv</h1>
        {loginStatus ? <ChessBoard/> : <GameNotAuthenticated/>} 
      <Footer />
    </>
  );
};

export default Game;
