
import React from "react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

// Dette er et komponent, som brukes i Friends.jsx, som kun vises dersom brukeren er logget inn.
const FriendsAuthenticated = () => {
  return (
  <>
   <p className="py-14 text-center text-2xl"></p>

  <div className="flex justify-center">
        <div className=" flex-col items-center rounded border bg-yellow-200 p-28 shadow-2xl">
          <span className="text-center">Vennesiden er midlertidig utilgjenglig!</span>
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
  </> 
  )
}

export default FriendsAuthenticated
