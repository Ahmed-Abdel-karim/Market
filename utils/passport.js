const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../configue/keys");
const User = require("../database/model/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

passport.use(
  new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id })
      .then(user => {
        if (user.isVerified) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
        throw err;
      });
  })
);
