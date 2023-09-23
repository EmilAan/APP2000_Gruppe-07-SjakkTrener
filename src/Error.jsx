// Laget av Philip

import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

// Errorside, som vises dersom en bruker navigerer til en lenke som ikke eksisterer
const Error = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

  // useEffect hook som kjøres når bruker er logget inn. Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar
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
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}
      <p className="py-14 text-center text-2xl"></p>

      <div className="flex justify-center">
        <div className=" flex-col items-center rounded border bg-yellow-200 p-28 shadow-2xl">
          <span className="text-center">Noe gikk galt!</span>
          <div>
            {isAuthenticated ? (
              <p>User is authenticated</p>
            ) : (
              <p>User is not authenticated</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-12 py-4">
            {" "}
            {/* Added gap-4 class */}
            <div className="flex justify-center">
              <button
                className="rounded bg-yellow-500 px-12 py-2 font-bold
               text-yellow-900 duration-300 hover:bg-yellow-300
               hover:text-yellow-800"
              >
                <Link to="/">Tilbake</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error;
