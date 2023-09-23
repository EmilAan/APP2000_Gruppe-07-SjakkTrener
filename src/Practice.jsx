
import React from "react";
import Footer from "./components/Footer";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";
import { useState, useEffect } from "react";
import axios from "axios";
import PracticeAuthenticated from "./components/PracticeAuthenticated";
import PracticeNotAuthenticated from "./components/PracticeNotAuthenticated";

// Øvingside, viser riktig navbar og innhold avhengig av om bruker er logget inn eller ikke
const Practice = () => {
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;

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
      {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated />}
      {loginStatus ? <PracticeAuthenticated /> : <PracticeNotAuthenticated />}
      <Footer />
    </>
  );
};

export default Practice;
