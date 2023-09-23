//Front-end laget av Philip
//Planen var å lage en nettside med oversikt av venner, slik som denne
//Men pga andre prioriteringer har vi lagt dette til side.

import React from "react";
import Footer from "./components/Footer";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";
import { UserCircleIcon } from "@heroicons/react/outline";

// Uferdig venneside, ikke tatt i bruk.
const Friends = () => {
  return (
    <>
      <NavbarNotAuthenticated />
      <p className="py-14 text-center text-2xl ">Venner</p>
      <div className="mx-32 grid grid-cols-1 gap-16 text-center  md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 1</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium 
                  uppercase leading-snug text-yellow-900 shadow-md
                 duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>

        <div className="rounded border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 2</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium 
                  uppercase leading-snug text-yellow-900 shadow-md
                 duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>

        <div className="rounded border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 3</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium 
                  uppercase leading-snug text-yellow-900 shadow-md
                 duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>

        <div className="rounded border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 4</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium 
                  uppercase leading-snug text-yellow-900 shadow-md
                 duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>
        <div className="rounded border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 5</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium 
                  uppercase leading-snug text-yellow-900 shadow-md
                 duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>

        <div className="border border-black bg-yellow-500">
          <div className="flex justify-evenly ">
            <UserCircleIcon className="h-20 w-20"></UserCircleIcon>
          </div>
          <div className="py-2">Brukernavn 6</div>
          <div className="py-4">
            <button
              className="hover:text-yellow-8003 rounded  bg-yellow-400 py-2 px-2 text-sm font-medium
          uppercase leading-snug text-yellow-900 shadow-md
          duration-300 hover:bg-yellow-300"
            >
              Vis profil
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Friends;
