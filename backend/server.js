const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportlocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const store = new session.MemoryStore();
const mongoDBSession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
const Åpning = require("./åpning");
const user = require("./user");
require("dotenv").config();
const serveStatic = require("serve-static");
const path = require("path");
const port = process.env.EXPRESS_PORT;

// Er for å koble til database, Emil, Adrian, Endre, Philip har bidratt
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose er tilkoblet");
    //console.log(process.env.MONGODB_URI);
  }
);

// Satt opp av Adrian, brukes for å store sessions i MongoDB
const mongoDBStore = new mongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});


// Satt opp av Adrian, CORS regler settes opp for å tillate kommunikasjon mellom frontend og backend
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://pacific-retreat-14389.herokuapp.com/",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Satt opp av Adrian, session opprettes for å holde bruker innlogget, cookie blir satt opp
app.enable('trust proxy')
app.use(
  session({
    key: "userId",
    secret: "secretcode",
    resave: false,
    cookie: { 
      maxAge: 60 * 60 * 24 * 1000,
      //sameSite: 'none',
      //secure: true,
    
    },
    saveUninitialized: false,
    store: mongoDBStore, 
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Hele gruppen har bidratt til login
app.post("/login", (req, res, next) => {
  console.log("Prøver å logge inn fra /login route");
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.send({loggedIn : false})
    }
    else {
      req.login(user, (err) => {
        if (err) throw err;
        req.session.user = user
        res.send({loggedIn : true});
        console.log("Bruker logget inn fra klient fra /login route");
        console.log("req.session.user fra /login: " + req.session.user);
        console.log(req.sessionID + " skriver ut sessionID");
      });
    }
  })(req, res, next);
});

// Laget av Adrian, sjekker om bruker er logget inn. er en useEffect som kjører på klientdel.
// returnerer enten true eller false
app.get("/loginCheck", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user});
    //console.log("User is logged in");
  } else {
    //console.log("User is not logged in");
    res.send({ loggedIn: false });
  }
});

// Hele gruppen har bidratt til registrering
app.post("/register", (req, res) => {
  console.log("mottar en post request for registrer på server.js");
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      console.log("Bruker finnes allerede");
      res.send({registered : false, melding: "Bruker finnes allerede"});
    } else if (!doc) {
      User.findOne({ email: req.body.email }, async (err, doc2) => {
        if (err) throw err;
        if (doc2) {
          console.log("email allerede i bruk");
          res.send({registered : false, melding: "Email allerede i bruk"});
        }
        if (!doc2) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
           //res.send("Bruker ble laget");
          let error;
          try {
            await newUser.save();
            res.send({registered : true});
          } catch (err) {
            error = err;
            console.log(error)
          }
        }
      });
    }
  });
});

// Laget av Adrian, logger bruker ut
app.get("/logout", function (req, res, next) {
  console.log("mottar get request for logout på server.js");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("bruker ble logget ut");
    res.redirect("/");
  });
});

// Laget av Philip og Emil
app.get("/user", (req, res) => {
  res.send(req.user);
});

// Legger til åpninger i db, laget av Endre
app.post("/lagreAapning", async (req, res) => {
  const newÅpning = new Åpning({
    username: req.body.username,
    åpningsNavn: req.body.åpningsNavn,
    trekkListe: req.body.trekk,
  });
  res.send("Åpning ble laget");
  await newÅpning.save();

  console.log(req.body);
});

// Henter åpninger fra db, laget av Endre
app.get("/hentAapninger", async (req, res) => {
  try {
    const openings = await Åpning.find({ åpningsNavn: { $ne: null } });
    res.json(openings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Fikk ikke hentet åpninger!" });
  }
});

// Laget av Philip og Emil
app.post("/endreBrukernavn", async (req, res) => {
  try {
    const navnSjekker = await User.findOne({ username: req.body.username });
    if (navnSjekker) {
      res.send({alreadyRegistered : true, message : "Brukernavnet er allerede i bruk!"});
    }
    const currNavn = { 
      username: req.user.username,
    };
    const nyData = { 
      username: req.body.username,
    };
    await User.findOneAndUpdate(currNavn, nyData, { upsert: true });
    await Åpning.updateMany(currNavn, nyData, { upsert: true });
    res.send({ message: "Brukernavnet ble oppdatert!" });
  } catch (error) {
    console.error(error);
  }
});

//Laget av Emil, med justeringer fra Adrian(logout etter sletting av bruker)
app.post("/slettBruker", async (req, res) => {
  try {
    const currNavn = { 
      username: req.user.username,
    };
    await User.deleteOne(currNavn);
    await Åpning.deleteMany(currNavn);
    
    req.logout(function(err) {
      if(err) {
        return res.send("Feilet å slette bruker, prøv igjen.")
      }
      return res.send("Brukeren ble slettet og logget ut!" );
    })
  } catch (error) {
    console.log(error);
    return res.send( "Feilet å slette bruker, prøv igjen." );
  }
})

// Sletter åpning, laget av Endre
app.post("/slettAapning", async (req, res) => {
  try {
    const currNavn = req.body.username;
    const currÅpningNavn = req.body.åpningsNavn;

    await Åpning.deleteOne({ 
      username: currNavn,
      åpningsNavn: currÅpningNavn
    });
    return res.json({ message: "Åpningen ble slettet!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Feilet å slette åpning, prøv igjen." });
  }
})

// Starter express serveren
app.listen(port, () => {
  let melding = "Server started på port " + port;
  console.log(melding);
  //console.log(process.env.PORT)
});
// Serving av react appen, laget av Adrian og Endre
app.use(express.static(path.resolve(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
