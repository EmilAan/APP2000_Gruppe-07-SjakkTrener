// Laget av Adrian, redesignet av Philip

import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Registreringsside for nettsiden
function Signup() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // yup schema for validering av input
    const schema = yup.object().shape({
    username: yup.string().min(3).required("Brukernavn må være minst 3 tegn"),
    email: yup.string().email().min(5).required("Email må være minst 3 tegn"),
    password: yup.string().min(3).required("Passord må være minst 3 tegn"),
    confirmPassword: yup.string().required().oneOf([yup.ref("password")], "Passordene må være like")
  });
  const { register, handleSubmit, formState: { errors}, reset } = useForm({
    resolver: yupResolver(schema),
  });

  // Funksjno for å sende post request til serveren, og registrere bruker
  // yup schema for validering av input må være fulgt
  const sendRegister = (data) => {
    console.log("trying to send post request");
    axios({
      method: "post",
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      withCredentials: true,
      //bruk denne når du skal hoste
      url: "/register",

      //bruk den under når du skal teste lokalt
      url: "http://localhost:4000/register"
    }).then((res) => {
      if(res.data.registered === true) {
        navigate("/login")
      } else { 
        setErrorMessage(res.data.melding);
        setShowErrorMessage(true);
      }
    });
  };
  // useEffect nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar, og
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
      console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        console.log(user);
        setLoginStatus(user);
        if(loginStatus === true) {
          navigate("/");
        }
      }
    });
  }, [loginStatus]);
  
// Laget av Endre, ble brukt før yup validering ble implementert
  const checkPassword = () => {
    if (registerPassword === confirmPassword && registerPassword !== "") {
      if (registerUsername.length > 2 && registerEmail.length > 2) {
        sendRegister();
      } else {
        setErrorMessage("Brukernavn og email må være lengre enn 2 tegn");
        setShowErrorMessage(true);
      }
    } else {
      if (registerPassword.length < 5) {
        setErrorMessage("Passordet må være lengre enn 5 tegn");
        setShowErrorMessage(true);
      } else {
        setErrorMessage("Passordene er ikke like");
        setShowErrorMessage(true);
      }
    }
  };

  return (
    <>
        {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}

      <div className="whitespace-nowrap py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-300 py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <Link to="/signup" className="mx-auto max-w-[160px]">
                    <p className="text-3xl font-bold">Registrer ny bruker</p>
                  </Link>
                </div>
                <form onSubmit={handleSubmit(sendRegister)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Brukernavn"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("username")}
                    />
                    {errors.username && (
                      <div className="text-red-500"> {errors.username.message} </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Email"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="text-red-500"> {errors.email.message} </div>
                    )}  
                    {showErrorMessage && (
                      <div className="text-red-500" id="errorMessage">
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Passord"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("password")}
                    />
                    {errors.password && (
                      <div className="text-red-500"> {errors.password.message} </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Bekreft Passord"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <div className="text-red-500"> {errors.confirmPassword.message} </div>
                    )}
                  </div>
                  <div className="mb-1 p-2">
                    <input  
                      type="submit"
                      value="Registrer"
                      className="rounded bg-yellow-500 px-12 py-2 font-bold
                      text-yellow-900 duration-300 hover:bg-yellow-300
                      hover:text-yellow-800"
                      
                    />
                    

                  </div>
                </form>

                <form>
                  
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
export default Signup;
