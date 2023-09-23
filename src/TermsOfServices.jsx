//Denne siden er laget av Jøren

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// funkjson som henter brukerdata til logget inn bruker.
export const getUser = (loginUsername, loginEmail) => {
  return axios({
    method: "get",
    params: {
      username: loginUsername,
      email: loginEmail,
    },
    withCredentials: true,
    url: "http://localhost:4000/user",
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// TermsOfServices side
const TermsOfServices = () => {
  const [userData, setUserData] = useState(null);
  const [loginUsername, setUsername] = useState("");
  const [loginEmail, setEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

  // Hook som kjører getUser() når siden lastes inn
  useEffect(() => {
    getUser(loginUsername, loginEmail).then((data) => {
      setUserData(data);
    });
  }, []);
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
      <h1 className="py-14 text-center text-2xl">Brukervilkår for Sjakktrener</h1>
      <div className="text-left text-xs">Sist oppdatert: 29.05.2023</div>
      <p>&nbsp;</p> 
      <div classname=" text-xl">
        Ved å bruke nettsiden Sjakktrener godtar du følgende vilkår og betingelser for bruk.<br></br>
        Vennligst les disse vilkårene nøye før du bruker nettsiden. Hvis du ikke godtar vilkårene,
        vennligst avstå fra å bruke nettsiden.</div>
      <p>&nbsp;</p> 
      <div className="text-left text-2xl underline">Generell bruk</div>
        <div classname="text-left">
          Sjakktrener tilbyr informasjon og tjenester uten å samle inn personlig identifiserbar
          informasjon eller andre former for data. <br></br>
          Sjakktrener forbeholder seg retten til å gjøre endringer i innholdet eller tjenestene som tilbys uten varsel.
        <p>&nbsp;</p> 
      </div>
      <div className="text-left text-2xl underline">Materielle rettigheter</div>
        <div classname="text-left">
          Brukere får kun lov til å bruke innholdet på nettsiden til personlig bruk og ikke-kommersiell bruk. <br></br>
          Enhver annen bruk, inkludert reproduksjon, distribusjon eller modifikasjon av innholdet, er forbudt
          uten uttrykkelig tillatelse fra nettsiden.<br></br>
        </div>
        <p>&nbsp;</p> 
        <div className="text-left text-2xl underline">Ansvarsfraskrivelse</div>
      <div classname="text-left">
        Sjakktrener gir ingen garantier for nøyaktigheten, påliteligheten eller fullstendigheten
        av informasjonen som tilbys på nettsiden. <br></br>
        Sjakktrener påtar seg intet ansvar for eventuelle skader eller tap som oppstår som følge av bruk av 
        eller tillit til informasjonen på nettsiden.
      </div>
      <p>&nbsp;</p> 
      <div className="text-left text-2xl underline">Linker til tredjeparts nettsider</div>
        <div classname="text-left">
          Sjakktrener nettsiden kan inneholde lenker til eksterne nettsteder som ikke kontrolleres eller drives av Sjakktrener. <br></br>
          Sjakktrener påtar seg ikke ansvar for innholdet, personvernpraksis eller sikkerheten til disse tredjeparts 
          nettstedene. Brukere må selv vurdere risikoen ved å bruke slike lenker.
        </div>
        <p>&nbsp;</p> 
      <div className="text-left text-2xl underline">Endringer i brukervilkår</div>
        <div classname="text-left">
          Sjakktrenerteamet forbeholder seg retten til å endre disse brukervilkårene når som helst. Endringer vil tre i kraft
          umiddelbart etter at de er publisert på nettsiden. <br></br>
          Ved fortsatt bruk av nettsiden etter endringer i brukervilkårene anses brukeren som enig i de oppdaterte vilkårene.
        </div>
        <p>&nbsp;</p> 
        <div className="text-left text-2xl underline">Kontaktinformasjon</div>
        <div classname="text-left">
          Hvis du har spørsmål, kommentarer eller bekymringer angående disse brukervilkårene, vennligst ta kontakt med oss via kontaktsiden.
      </div>
      <p>&nbsp;</p> 
      <Footer />
    </>
  );
};

export default TermsOfServices;
