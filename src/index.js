// Opprinnelig satt opp av Adrian, men gruppen har lagt til egen routing etter behov

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Friends from "./Friends";
import Practice from "./Practice";
import Error from "./Error";
import Game from "./Game";
import Login from "./Login";
import Info from "./Info";
import Profile from "./Profile"
import Contact from "./Contact";
import TermsOfServices from "./TermsOfServices";
import Signup from "./Signup";
import Home from "./Home";
import Privacy from "./Privacy";
import LagÅpning from "./LagÅpning"
import OveÅpning from "./OveÅpning"
import Rediger from "./Rediger"
import DeleteUser from "./DeleteUser"

// root renderer for reactnettsiden. Routes er definert, og hver route har en path og et element som skal rendres
// path er urlen som skal til for å komme til elementet
// element er komponenten som skal rendres
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-300 ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/lagAapning" element={<LagÅpning />} />
        <Route path="/oveaapning" element={<OveÅpning />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfServices />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rediger" element={<Rediger />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);