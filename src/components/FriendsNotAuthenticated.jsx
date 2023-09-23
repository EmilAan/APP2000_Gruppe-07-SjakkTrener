//Denne er laget av Philip
//Koden er gjenbrukt, siden mye av dette er ganske likt
import React from "react";
import { Link } from "react-router-dom";

// Dette er et komponent, som brukes i Friends.jsx, som kun vises dersom brukeren ikke er logget inn.
const FriendsNotAuthenticated = () => {
  return (
  <>
  <p className="py-14 text-center text-2xl"></p>

<div className="flex justify-center">
  <div className="flex flex-col items-center p-28 bg-yellow-200 border rounded shadow-2xl">
    <span className="text-center">
      Du må være logget inn for å ha tilgang til venneliste
    </span>
    <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-12">
      <div className="flex justify-center">
        <button className="rounded bg-yellow-500 px-12 py-2 font-bold
         text-yellow-900 duration-300 hover:bg-yellow-300
         hover:text-yellow-800">
          <Link to="/login">Logg inn</Link>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="rounded bg-yellow-500 px-12 py-2 font-bold
         text-yellow-900 duration-300 hover:bg-yellow-300
         hover:text-yellow-800">
          <Link to="/signup">Registrer</Link>
        </button>
      </div>
    </div>
  </div>
</div>
  </> 
  )
}

export default FriendsNotAuthenticated