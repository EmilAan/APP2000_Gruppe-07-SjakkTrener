

import React from "react";
import Footer from "./components/Footer";
import qa from "./ikon/qa.png";
import email from "./ikon/email.png";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// Dette er en side som inneholder kontaktinformasjon til utviklerne av nettsiden, og en FAQ.
const Contact = () => {

  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

  // useEffect hook som settes ved navigering av conatct siden. Er nødvendig for å vise navbar utifra om bruker er logget inn eller ikke
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
     // console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
       // console.log(user);
        setLoginStatus(user);
      }
    });
  }, [loginStatus]);
  
  return (
    <>
{loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}
<div className=" bg-yellow-200 text-center">      
  <h1 className="text-4xl underline py-8">Kontakt oss</h1>
</div>

<div className="flex justify-around bg-yellow-200 p-2">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-6 place-items-center">
      
  <div className="flex items-center">
  <img src={email} alt="ikonemail" className="" />
  <div className="ml-4 py-4"> 
    <h1 className="text-3xl py-2 font-semibold">E-mail</h1>
    <button className="rounded bg-yellow-500 px-12 py-2 font-bold
      text-yellow-900 duration-300 hover:bg-yellow-300
      hover:text-yellow-800">
     <a href="mailto:sjakktrener@usn.no">Ta kontakt</a>
    </button>
  </div>
</div>

    <div className="flex items-center">
  <img src={qa} alt="ikonqa" className="" />
  <div className="ml-4 py-4"> 
    <h1 className="text-3xl py-2 font-semibold"> Ofte stilte spørsmål</h1>
    <button className="rounded bg-yellow-500 px-12 py-2 font-bold
      text-yellow-900 duration-300 hover:bg-yellow-300
      hover:text-yellow-8000">
      Sjekk her
    </button>
  </div>
</div>
    </div>
  </div>
    <div className="">
    <div className="">
      <h1 className="text-4xl underline py-8 text-center">Ofte stilte spørsmål</h1>
      </div> 
      <div>
            <div className="">
                <details className="p-4 rounded-lg flex text-center">
                    <summary className="font-semibold">Hvem er dere?</summary>
                    <div className="flex justify-center mt-4">
                        <p className="text-md leading-6 py-2 ">
                        Vi er 5 elever ifra USN som har fått i oppgave om å lage en applikasjon,
                        Vi har jobbet med prosjektet i ca. et år.
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg flex text-center">
                    <summary className="font-semibold">
                    Kan jeg lære sjakk ved bruk av denne nettsiden?
                    </summary>
                    <div className="flex justify-center mt-4">
                        <p className="text-md leading-6 py-2  ">
                        Du kan lære veldig elementær sjakk hos oss. Her kan du spille sjakk, øve på åpninger og lage dine egne.
                        Hvis du vil bli enda bedre i sjakk kan det være nytte å lese bøker rundt sjakk.
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg flex text-center">
                    <summary className="font-semibold">
                    Hva er sjakkreglene?
                    </summary>
                    <div className="flex justify-center mt-4">
                        <p className="text-md leading-6 py-2 ">
                        Sjakkreglene er mange men enkle å forstå. De inviduelle reglene kan du lese om ved å trykke på 
                        <a href="https://sakkpalota.hu/index.php/en/chess/rules" class="text-blue-600"> denne </a>
                         linken. 
                        </p>
                    </div>
                </details>
                <details className="p-4 rounded-lg block mx-auto text-center">
                    <summary className="font-semibold">
                    Kommer det flere funksjoner til nettsiden?
                    </summary>
                    <div className="flex justify-center mt-4">
                        <p className="text-md leading-6 py-2 ">
                        Det er usikkert på om vi jobber videre med nettsiden. Hvis vi har interesse om flere funksjoner eller vil 
                        lære mer så kan det være mulighet for at nettsiden videreutvikles. Hvis du har noen tanker rundt videreutvikling
                        gjerne ta kontakt med en av oss. 
                        </p>
                    </div>
                </details>
            </div>
        </div>
    </div>
<Footer />
    </>
  );
};

export default Contact;
