// Laget av Endre

import React from "react";
import { Link } from "react-router-dom";
import practicePhoto from "../img/practicePhoto.jpeg";

// dette er et komponent som vises dersom bruker er logget inn og prøver å gå inn på øvesiden
const PracticeAuthenticated = () => {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-center">
        <h1 className="py-2 text-3xl font-semibold">Øv på åpninger</h1>
      </div>
      <div className=" p-4">
        <div className="flex justify-center gap-8">
          <Link to="/lagAapning">
            <button
              className="w-80 rounded bg-yellow-500 px-12 py-2 font-bold
        text-yellow-900 duration-300 hover:bg-yellow-300
        hover:text-yellow-800"
            >
              Lag ny åpning
            </button>
          </Link>

          <Link to="/oveaapning">
            <button
              className="w-80 rounded bg-yellow-500 px-12 py-2 font-bold
        text-yellow-900 duration-300 hover:bg-yellow-300
        hover:text-yellow-800"
            >
              Tren på eksisterende
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={practicePhoto}
          alt="practicePhoto"
          className="mb-4 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default PracticeAuthenticated;
