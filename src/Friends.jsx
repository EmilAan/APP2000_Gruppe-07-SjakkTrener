
import {useState, useEffect} from "react";
import Footer from "./components/Footer";
import axios from "axios";
import NavbarAuthenticated from "./components/NavbarAuthenticated";
import NavbarNotAuthenticated from "./components/NavbarNotAuthenticated";
import FriendsAuthenticated from "./components/FriendsAuthenticated";
import FriendsNotAuthenticated from "./components/FriendsNotAuthenticated";

// Venneside 
const Friends = () => {
  const [loginStatus, setLoginStatus] = useState("");
  axios.defaults.withCredentials = true;
  
  // useEffect hook som kjøres når bruker er logget inn. 
  // Nødvendig for å sjekke om bruker er logget inn eller ikke og vise riktig navbar, og vise riktig vennekomponent
  useEffect(() => {
    axios.get("http://localhost:4000/loginCheck").then((response) => {
     // console.log(response.data.user);
      if (response.data.loggedIn === true) {
        const user = response.data.loggedIn;
       // console.log(user);
        setLoginStatus(user);
      }
    });
  }, [loginStatus]);
  
  return (
    <>
  {loginStatus ? <NavbarAuthenticated /> : <NavbarNotAuthenticated/>}
    {loginStatus ? <FriendsAuthenticated/> : <FriendsNotAuthenticated/>}  
      <Footer />
    </>
  );
};

export default Friends;
