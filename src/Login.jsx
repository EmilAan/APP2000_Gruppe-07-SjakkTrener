import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Loginside for nettsiden
const Login = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();

  // Schema for validering av input
  const schema = yup.object().shape({
    username: yup.string().min(3).required("Brukernavn må være minst 3 tegn"),
    password: yup.string().min(3).required("Passord må være minst 3 tegn"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  axios.defaults.withCredentials = true;
  //const [data, setData] = useState(null);
  // Sender post request som sendes dersom bruker trykker på login knappen,
  // Det vil ikke være mulig å logge inn dersom reglene til yup schema ikke er oppfylt
  const login = (data) => {
    axios({
      method: "post",
      data: {
        username: data.username,
        password: data.password,
      },
      withCredentials: true,
      //bruk denne ved hosting
      url: "/login",

      //bruk denne for å kjøre lokalt
      url: "http://localhost:4000/login",
    }).then((res) => {
      if (res.data.loggedIn === true) {
        navigate("/");
      } else {
        setShowErrorMessage(true);
      }
    });
  };
 // Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar,
 // Og navigere bort bruker dersom de er logget på.
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
      //console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
        //console.log(user);
        setLoginStatus(user);
        if (loginStatus === true) {
          navigate("/");
        }
      }
    });
  }, [loginStatus]);

  return (
    <>
      <NavbarNotAuthenticated />
      <div className="whitespace-nowrap py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-300 py-16 px-10 text-center sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <Link to="/login" className="mx-auto max-w-[160px]">
                    <p className="text-3xl font-bold">Logg inn</p>
                  </Link>
                </div>
                <form onSubmit={handleSubmit(login)}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Brukernavn"
                      className="bg-white-400 w-full rounded-lg border py-3 px-5"
                      {...register("username")}
                    />
                    {errors.username && (
                      <div className="text-red-500">
                        {" "}
                        {errors.username.message}{" "}
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
                      <div className="text-red-500">
                        {" "}
                        {errors.password.message}{" "}
                      </div>
                    )}
                  </div>
                  <div className="mb-10">
                    <button
                      className="rounded bg-yellow-500 px-12 py-2 font-bold
                  text-yellow-900 duration-300 hover:bg-yellow-300
                  hover:text-yellow-800"
                      onClick={login}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className=" flex justify-around ">
                  <Link
                    to="/signup"
                    className="hover:text-blue-600 hover:underline"
                  >
                    Registrer deg
                  </Link>

                  <Link
                    to="/login"
                    className="hover:text-blue-600 hover:underline"
                  >
                    Glemt passord?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
