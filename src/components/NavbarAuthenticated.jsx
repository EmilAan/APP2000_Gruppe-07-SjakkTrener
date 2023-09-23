//Navigasjonsbaren er laget av Philip og Adrian
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import sjakklogo from "../img/sjakktrenerlogo.png";
import { Link } from "react-router-dom";
import { Zoom, Slide } from "react-awesome-reveal";

// Dette er navbar som alltid ligger øverst i nettsiden, som inneholder eventuelle lenker og relevant
// informasjon til bruker for å navigere seg rundt på nettsiden, og få tilgang til sin egen profil, dersom innlogget.
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [userData, setUserData] = useState(null);
  const [loginUsername, setUsername] = useState("");

  // Er en hook, som kjører en gang når komponenten blir rendret. og kjører getUser() funksjonen.
  useEffect(() => {
    getUser();
  }, []);
 // Henter ut brukerinformasjonen til brukeren som er logget inn, og setter det inn på nettsiden
  const getUser = () => {
    axios({
      method: "get",
      params: {
        username: loginUsername,
      },
      withCredentials: true,
      url: "http://localhost:4000/user",
    })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <nav className="border-b-2 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* logo*/}

              <div>
                <Link
                  to="/"
                  className="flex items-center py-5 px-1 text-gray-700 hover:text-gray-900"
                >
                  <img
                    src={sjakklogo}
                    alt="logo"
                    className="w-28 border-b-2 border-yellow-400 "
                  />
                </Link>
              </div>

              {/* Primærnavbaren*/}
              <div className="hidden items-center space-x-1 sm:hidden md:flex">
                <Link
                  to="/game"
                  className="py-8 px-3 text-gray-700 hover:text-gray-900"
                >
                  Spill
                </Link>
                <Link
                  to="/practice"
                  className="py-8 px-3 text-gray-700 hover:text-gray-900"
                >
                  Øving
                </Link>
                <Link
                  to="/friends"
                  className="py-8 px-3 text-gray-700 hover:text-gray-900"
                >
                  Venner
                </Link>
                <Link
                  to="/contact"
                  className="py-8 px-3 text-gray-700 hover:text-gray-900"
                >
                  Hjelp
                </Link>
              </div>
            </div>
            {/*  Andre delen av navbar, viser kun en knapp med lenke til profilsiden. Og brukeren sitt brukernavn.*/}
            <div className="hidden items-center space-x-1 md:flex">
              <Link
                to="/profile"
                className="rounded bg-yellow-400  py-2 px-3 text-sm font-medium leading-snug text-yellow-900 shadow-md duration-300 hover:bg-yellow-300 hover:text-yellow-800"
              >
                {userData && userData.username}
              </Link>
            </div>

            {/* navbaren, og knapp som vises for mobile enheter*/}
            <div className="md:hidden" onClick={handleClick}>
              {!nav ? (
                <MenuIcon className="w-6 py-8" />
              ) : (
                <XIcon className="w-6 py-8" />
              )}
            </div>
          </div>
        </div>
        <div>
          {/* Vises kun dersom klienten er på en mobil enhet*/}
          <ul
            className={
              !nav
                ? "hidden"
                : "space-y-6 border-2 bg-gradient-to-b from-slate-50 to-transparent py-8 text-center md:hidden"
            }
          >
            <Zoom>
              <li className=" text-xl">
                <button className="rounded bg-yellow-500 px-4 py-2 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/game">Spill</Link>
                </button>
              </li>
            </Zoom>

            <Zoom>
              <li className=" text-xl">
                <button className="rounded bg-yellow-500 px-4 py-2 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/practice">Øving</Link>
                </button>
              </li>
            </Zoom>
            <Zoom>
              <li className=" text-xl">
                <button className="rounded bg-yellow-500 px-4 py-2 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/friends">Venner</Link>
                </button>
              </li>
            </Zoom>

            <Zoom>
              <li className=" text-xl">
                <button className="rounded bg-yellow-500 px-4 py-2 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/profile">Profil</Link>
                </button>
              </li>
            </Zoom>
          </ul>
        </div>
      </nav>
      <div className="text-center"></div>
    </div>
  );
};

export default Navbar;
