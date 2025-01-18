const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require("passport-google-one-tap").GoogleOneTapStrategy;
const dotenv = require('dotenv').config();
let options = {}
options.clientID = process.env.clientID;
options.clientSecret = process.env.clientSecret;
options.callbackURL = process.env.callbackURL;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use('google', new GoogleStrategy({
    clientID: options.clientID,
    clientSecret: options.clientSecret,
    callbackURL: options.callbackURL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(
    new GoogleOneTapStrategy(
        {
            //client_id:"xxxxxxx.apps.googleusercontent.com", //local
            client_id: options.clientID, //prod-oneTap
            //clientSecret: "xxxx", //local
            clientSecret: options.clientSecret, // prod-oneTap
            verifyCsrfToken: false, // whether to validate the csrf token or not
        },
        function (profile, done) {
            return done(null, profile);
        }
    )
);

passport.use(new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
        sistema.loginUsuario({ email: email, password: password }, function (user, error) {
            if (error) {
                return done(null, false, { message: error }); 
            }
            if (user) {
                return done(null, user); 
            } else {
                return done(null, false, { message: "Credenciales incorrectas" }); 
            }
        });
    }
));