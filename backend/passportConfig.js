// Hele gruppen har bidratt til passportConfig.js

const User = require("./user");
const bcrypt = require("bcryptjs");
const user = require("./user");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    try {
      User.findOne({ _id: id }, (err, user) => {
        if (user) {
          const userInformation = {
            username: user.username,
            email: user.email,
          };
          cb(err, userInformation);
        } else {
          cb(err, null);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
};
