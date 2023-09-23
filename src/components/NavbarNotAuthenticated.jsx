//Navigasjonsbaren er laget av Philip og Adrian

import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import sjakklogo from "../img/sjakktrenerlogo.png";
import { Link } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

// Dette er et navbar komponent som vises dersom brukeren ikke er logget inn, og inneholder lenker til de ulike sidene på nettsiden.
const NavbarNotAuthenticated = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <>
      <nav className=" bg-gray-50">
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

              {/* Primærnavn, med lenker til  nav*/}
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

            {/* Sekunærdel av primærnavbar, man kan velge å logge på eller registrere seg.*/}
            <div className="hidden items-center space-x-1 md:flex">
              <Link to="/login" className="py-5 px-3">
                Logg inn
              </Link>
              <Link
                to="/signup"
                className="rounded bg-yellow-400  py-2 px-3 text-sm font-medium uppercase leading-snug text-yellow-900 shadow-md duration-300 hover:bg-yellow-300 hover:text-yellow-800"
              >
                Registrer
              </Link>
            </div>

            {/* Mobilvennlig knapp for å gjemme og vise navbar*/}

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
          {/* Mobilvennlig navbar*/}
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
                  <Link to="/login">Logg inn</Link>
                </button>
              </li>
            </Zoom>

            <Zoom>
              <li className=" text-xl">
                <button className="rounded bg-yellow-500 py-2 px-4 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/signup">Registrer</Link>
                </button>
              </li>
            </Zoom>
          </ul>
        </div>
      </nav>
      <div className="text-center"></div>
    </>
  );
};

export default NavbarNotAuthenticated;
