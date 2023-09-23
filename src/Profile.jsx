//Laget av Philip og Emil

import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import NavbarAuthenticated from "./components/NavbarAuthenticated";

// Profilside som viser innlogget bruker sin informasjon.
const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loginUsername, setUsername] = useState("");
  const [loginEmail, setEmail] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  // Hook som kjører getUser() når siden lastes inn
  useEffect(() => {
    getUser();
  }, []);
  //  console.log(userData);

  
 // Funksjon for å hente brukerdata til bruk i profilside
  const getUser = () => {
    axios({
      method: "get",
      params: {
        username: loginUsername,
        email: loginEmail,
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

  // Nødvendig for å sjekke om bruker er logget inn eller ikke. 
  // Er for å sende vekk klient dersom bruker ikke er logget inn. 
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

  // Funksjon for å logge ut bruker når klient har trykket på logg ut knapp
  const logout = async () => {
    console.log("prøver logge ut");
    axios({
      method: "get",
      withCredentials: true,
      //bruk denne når du skal hoste
      url: "/logout",

      //bruk den under når du skal teste lokalt
      url: "http://localhost:4000/logout",
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavbarAuthenticated />
      <h1 className="py-4"></h1>
      <div className="text-center">
        <div className="rounded border border-black bg-yellow-200">
          <div className="flex justify-center">
            <UserCircleIcon className="h-48 w-48" />
          </div>
          <div className="space-y-2 py-2">
            <div className="text-2xl font-bold">
              {userData && userData.username}
            </div>
            <div className="">email: {userData && userData.email}</div>
            <div className="">Bio: {userData && userData.info1}</div>
            <div className="">Info 2: {userData && userData.info2}</div>
            <div className="">Info 3: {userData && userData.info3}</div>
            <div className="">Info 4: {userData && userData.info4}</div>

            <button
              className="rounded bg-yellow-500 px-6 py-2 font-bold
               text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800"
            >
              <Link to="/rediger">Rediger profil</Link>
            </button>
            <div className="grid grid-cols-1 place-items-center gap-2 ">
              <button
                className="rounded bg-yellow-500 px-12 py-2 font-bold
               text-yellow-900 duration-300 hover:bg-yellow-300
               hover:text-yellow-800"
                onClick={logout}
              >
                Logg ut
              </button>

              <Link to="/deleteuser">
                <button
                  className="mt-10 rounded bg-red-500 px-8 py-2
                  font-bold text-yellow-900 duration-300 hover:bg-yellow-300 hover:text-yellow-800"
                >
                  Slett bruker
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
