// Laget av Philip

import {useEffect, useState} from "react";
import Footer from "./components/Footer";
import portrait1 from "./img/portrait1.jpg";
import portrait2 from "./img/portrait2.jpg";
import portrait3 from "./img/portrait3.jpg";
import portrait4 from "./img/portrait4.jpg";
import portrait5 from "./img/portrait5.jpg";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// Informasjonsside som viser gruppemedlemmer sin rolle, og navn på gruppemedlemmer.
const Info = () => {
  const [loginStatus, setLoginStatus] = useState("");
  
  // Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar.
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
      <h1 className="mb-8 pt-4 text-center text-4xl font-bold">Informasjon</h1>
      <div className="text-center">
        Vi er en gruppe med studenter som har fått oppgave å utvikle en
        nettside.
      </div>

      <div className="flex justify-center px-12 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col items-center border-2">
            <img
              src={portrait1}
              alt="Bilde 1"
              className="mb-4 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Philip Toan Nguyen</h2>
            <p className="mb-4 text-gray-600">Front-end | Scrumleder</p>
            <p className="py-4 text-center">
              
            </p>
          </div>

          <div className="flex flex-col items-center border-2">
            <img
              src={portrait2}
              alt="Bilde 2"
              className="mb-4 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Adrian Joachin</h2>
            <p className="mb-4 text-gray-600">Fullstack</p>
            <p className="py-4 text-center">
              
            </p>
          </div>

          <div className="flex flex-col items-center border-2">
            <img
              src={portrait3}
              alt="Bilde 3"
              className="mb-4 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Emil Aandahl</h2>
            <p className="mb-4 text-gray-600">Fullstack</p>
            <p className="py-4 text-center">
              
            </p>
          </div>

          <div className="flex flex-col items-center border-2 ">
            <img
              src={portrait4}
              alt="Bilde 4"
              className="mb-4 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Endre Kvam</h2>
            <p className="mb-4 text-gray-600">Fullstack</p>
            <p className="py-4 text-center">
              
            </p>
          </div>

          <div className="flex flex-col items-center border-2">
            <img
              src={portrait5}
              alt="Bilde 5"
              className="mb-4 rounded-full object-cover"
            />
            <h2 className="text-xl font-semibold">Jøren Ådne Sinnes</h2>
            <p className="mb-4 text-gray-600">Dokumentasjon | Design</p>
            <p className="py-4 text-center">
              
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Info;
