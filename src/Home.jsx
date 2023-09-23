
// Bruker IndexNotAuthenticated.jsx og IndexAuthenticated.jsx for å vise riktig innhold avhengig av om bruker er logget inn eller ikke.
import React from "react";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import IndexNotAuthenticated from "./components/IndexNotAuthenticated";
import IndexAutheticated from "./components/IndexAuthenticated";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";

const Home = () => {
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

 // Sjekker om bruker et logget inn eller ikke, viser riktig navbar og innhold om bruker er logget inn eller ikke
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
     // console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
      //  console.log(user);
        setLoginStatus(user);
      }
    });
  }, [loginStatus]);

  return (
    <>
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}
        {loginStatus ? <IndexAutheticated /> : <IndexNotAuthenticated />}
      <Footer />
    </>
  );
};

export default Home;
