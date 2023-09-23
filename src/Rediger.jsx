// Laget av Philip og Emil

import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Rediger bruker side
function Rediger() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  axios.defaults.withCredentials = true;

  // yup schema for validering av input
  const schema = yup.object().shape({
    username: yup.string().min(3).required("Brukernavn må være minst 3 tegn"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Funksjon for å sende post request til serveren, og endre brukernavn.
  // etter blir de navigert til profilsiden sin.
  const endre = (data) => {
    axios({
      method: "post",
      data: {
        username: data.username,
      },
      withCredentials: true,
      //bruk denne når du skal hoste
      url: "/endreBrukernavn",

      //bruk den under når du skal teste lokalt
      url: "http://localhost:4000/endreBrukernavn",
      timeout: 3000,
    }).then((res) => {
      if (res.data.alreadyRegistered === true) {
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
      } else {
        setShowErrorMessage(false);
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      }
    });
  };

  // Nødvendig for å sjekke om bruker er logget inn eller ikke. Dersom klient ikke er logget inn, blir de sendt til /login siden.
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
      // console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        setLoginStatus(user);
      } else {
        navigate("/login");
      }
    });
  }, [loginStatus]);

  const checkPassword = () => {
    if (registerUsername !== "" && registerUsername.length > 2) {
      endre();
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <>
      <NavbarAuthenticated />
      <div className="whitespace-nowrap lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-300 py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <Link to="/signup" className="mx-auto max-w-[160px]">
                    <p className="text-3xl font-bold">Endre profilen din</p>
                  </Link>
                </div>
                <form onSubmit={handleSubmit(endre)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Brukernavn"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("username")}
                    />
                    {errors.username && (
                      <div className="text-red-500">
                        {errors.username.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <select
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled={true}>Velg kjønn</option>
                      <option value="Gutt">Mann</option>
                      <option value="Jente">Kvinne</option>
                      <option value="Intetkjønn">Ikke spesifisert</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <textarea
                      rows="4"
                      disabled={true}
                      placeholder="Bio (Maks 100 tegn)"
                      maxLength={100}
                      className="bg-white-400 w-full rounded-lg border py-3 px-5 text-center"
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <input
                      type="text"
                      disabled={true}
                      placeholder="Email"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      disabled={true}
                      placeholder="Nytt passord"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      disabled={true}
                      placeholder="Bekreft Passord"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-1">
                    <button className="rounded bg-yellow-500 px-4 py-2 font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800">
                      Bekreft endring
                    </button>
                    {showSuccessMessage && (
                      <div className="mt-4 text-center text-2xl text-green-500">
                        Endringer lagret! Sendes til profil.
                      </div>
                    )}
                    {showErrorMessage && (
                      <div className="mt-4 text-center text-2xl text-red-500">
                        Ugyldig brukernavn.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </>
  );
}
export default Rediger;
