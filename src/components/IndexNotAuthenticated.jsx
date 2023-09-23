//Indexside er laget av Philip

import React from "react";
import { Fade } from "react-awesome-reveal";
import "../index.css";
import { Link } from "react-router-dom";

// Dette er et komponent som brukes i Home.jsx og vises dersom brukeren ikke er logget inn og går til index-siden. 
// Inneholder eventuelle lenker og knapper til å navigere til login og signup.
const IndexNotAuthenticated = () => {
  return (
    <>
        <div className="bakgrunn bg-contain bg-center ">
        <div className="py-28 text-yellow-500">
          <div className="flex justify-center ">
            <div className="w-full rounded-lg bg-gradient-to-b from-zinc-900 to-transparent text-center">
              <div className="py-8 text-center font-mono text-6xl font-bold">
                <Fade>
                  <h1 className="leading-relaxed">
                    {" "}
                    Velkommen til Sjakktrener!{" "}
                  </h1>
                </Fade>
              </div>
              <div className="py-1 text-center font-mono text-2xl">
                <Fade top>
                  <p>Registrer deg eller logg inn for å spille sjakk!</p>
                </Fade>
              </div>
              <div className="space-x-8 py-8 text-center ">
                <button className="rounded-full bg-yellow-500 py-2 px-4 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/login">Logg inn</Link>
                </button>
                <button className="rounded-full bg-yellow-500 py-2 px-4 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                  <Link to="/signup">Registrer</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols grid-cols-1  md:grid-cols-2 lg:grid-cols-2 justify-between py-8 px-16 gap-16 mx-26">
        <div className="border-2 rounded px-4 py-2 text-center">
        <h1 className=" px-2 py-4 text-4xl underline text-center ">
          Hva er sjakk?</h1>
        {indexTekst}
        </div>

        <div className="border-2 rounded px-4 py-2 text-center">
        <h1 className=" px-2 py-4 text-4xl underline text-center ">Visste du?</h1>
          <ul className="list-disc text-left px-12 space-y-4 text-md py-2">
            <li> Sjakk kan være bra for hjernen din! Studier har vist at det å spille sjakk kan forbedre konsentrasjonen, problemløsningsevnen og minnet ditt.</li>
            <li> Det finnes en sjakkvariant kalt "Sjakkboksing" der spillerne spiller et trekk i sjakk og deretter utfører en bokseteknikk på en boksesekk. Det er en kombinasjon av mental og fysisk utfordring..</li>
            <li> En av de mest kjente sjakkåpningene er kalt "Fool's Mate" eller "Tulletrekket". Det er den raskeste måten å vinne eller tape et parti på. Det kan skje på bare to trekk hvis begge spillerne gjør feil.</li>
            <li> Visste du at det finnes sjakkcomputere som kan spille på et høyt nivå og til og med slå de beste menneskelige sjakkspillerne? Dette skyldes at datamaskiner kan analysere sjakkstillingene mye raskere enn mennesker kan, og dermed ta smartere beslutninger.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-24 mx-28 py-16 ">
        <div className="  rounded-xl border-2 py-4 text-center">
          <h1 className="bg-slate py-12 font-mono text-2xl font-bold underline">
            {" "}
            Lær deg å spille sjakk!{" "}
          </h1>
      
          <Link
                to="/game"
                className="rounded bg-yellow-500 py-2 px-4 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800"
              >
                Start spill
          </Link>
        
        </div>
        <div className=" rounded-xl border-2 py-4 text-center">
          <h1 className="bg-slate py-12 font-mono text-2xl font-bold underline">
            {" "}
            Lær deg ulike strategier!{" "}
          </h1>
          <Link
                to="/practice"
                className="rounded bg-yellow-500 py-2 px-4 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800"
              >
                Start øving
          </Link>
        </div>
      </div>
    </>
  )
}

const indexTekst = (
    <p className="text-justify leading-8">
      Sjakk er et brettspill for to spillere. Målet for hver spiller er å sette
      motstanderens konge «under angrep» på en slik måte at motstanderen ikke har
      noe lovlig trekk. Kongen er da «sjakk matt». Sjakk er et av verdens mest
      populære spill og det er anslått at over 600 millioner av mennesker spiller
      sjakk på verdensbasis. Sjakk spilles på et kvadratisk sjakkbrett med 64
      felter som er vekselvis lyse og mørke.Ved partiets begynnelse har den ene
      spilleren 16 lyse brikker, mens den andre har 16 mørke brikker. Spilleren
      med de hvite brikkene starter partiet, deretter veksler motstanderne på å
      utføre trekk. I tillegg til ved «sjakk matt», kan spillet bli vunnet ved at
      den ene spilleren gir opp. Et parti kan også ende med «remis» (uavgjort) på
      flere måter. Sjakkspillet deles gjerne inn i tre faser: åpning, midtspill og
      sluttspill. Selve spillereglene i sjakk er relativt enkle, men sjakk gir rom
      for svært avansert taktikk og strategi.
    </p>
  );

export default IndexNotAuthenticated