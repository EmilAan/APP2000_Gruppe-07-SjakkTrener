//Denne siden er laget av Jøren

import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// Personvernside, viser litt informasjon om personverserklæring
const Privacy = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  // Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
      console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        console.log(user);
        setLoginStatus(user);
      }
    });
  }, [loginStatus]);
  return (
    <>
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated />}
      <h1 className="py-14 text-center text-2xl">Personvern</h1>
      <div className="text-center">
        Denne personvernserklæringen beskriver hvordan dine personopplysninger behandles
        ved bruk av tjenesten vår "Sjakktrener". <br></br>
        Vi sørger for å ivareta personvernet ditt når du bruker vår applikasjon. 
        Vi har ansvar for å håndtere data på en sikker og brukervennlig måte, <br></br>
        som både oppfyller både lovkrav og de forventninger brukerne våre har.
        Ettersom dette er et studentprosjekt så kommer vi ikke til å gi bort <br></br>
        eller selge dine personopplysninger.
        
      </div>

      <Footer />
    </>
  );
};

export default Privacy;
