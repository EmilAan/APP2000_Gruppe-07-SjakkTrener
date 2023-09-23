// Laget av Emil

import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// Er egen side for å slette bruker, for å unngå at bruker sletter seg selv ved et uhell, krever bekreftelse
const DeleteUser = () => {
  const [delUsername, setDeleteUsername] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Er en funksjon som kjører dersom man trykker "slett bruker". 
  // Sender en post request til serveren med brukernavnet til brukeren som skal slettes, og bruker blir logget ut og sendt tilbake til forsiden
  const deleteUser = () => {
    console.log("prøver å sende delete req");
    axios({
      method: "post",
      data: {
        username: delUsername,
      },
      withCredentials: true,
      //bruk denne ved hosting
      url: "/slettBruker",

      //bruk denne for å kjøre lokalt
      url: "http://localhost:4000/slettBruker",
    }).then((res) => {
      console.log(res);
      navigate("/");
    });
  };

  // useEffect hook som kjøres når bruker er logget inn. Dersom ikke, blir de sendt til /login
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
     // console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        setLoginStatus(user);
      }
      else {
        navigate("/login");
      }
    });
  }, [loginStatus]);

  return (
    <>
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated />}
      <p className="py-14 text-center text-2xl"></p>

      <div className="flex justify-center">
        <div className="flex flex-col items-center rounded border bg-yellow-200 p-28 shadow-2xl">
          <span className="text-3xl font-bold">
            Er du sikker på at du vil slette brukeren?
          </span>
          <span className="p-4 text-lg">
            Det vil ikke være mulig å gjenopprette brukeren igjen
          </span>
          <div className="grid grid-cols-1 gap-12 py-4 md:grid-cols-2">
            <div className="flex justify-center">
              <button
                className="rounded bg-yellow-500 px-12 py-2 font-bold
         text-yellow-900 duration-300 hover:bg-yellow-300
         hover:text-yellow-800"
              >
                <Link to="/profile">Tilbake</Link>
              </button>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded bg-yellow-500 px-12 py-2 font-bold
                  text-yellow-900 duration-300 hover:bg-yellow-300
                  hover:text-yellow-800"
                onClick={deleteUser}
              >
                Slett bruker
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeleteUser;
