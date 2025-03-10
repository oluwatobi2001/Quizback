const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
 // Sequelize models are assumed to be here
const User = require("../model/users.model") // Your User model
const passport = require("passport")


const GoogleStrategy = require('passport-google-oauth20').Strategy;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // Using 'email' instead of 'username'
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await User.findOne( {   email });

          if (!user) {
            return done(null, false, { message: "User not found." });
          }

          // Compare the provided password with the stored hashed password
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            return done(null, false, { message: "Incorrect password." });
          }

          // If everything is valid, return the user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

console.log(process.env.CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
    ,
    callbackURL: "http://localhost:5000/v1/auth/google/callback"
  },

async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value, // Google returns an array of emails
       username: profile.displayName
      });

      await user.save();
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}
));


  // Serialize user to store user ID in the session
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user._id);
  });

  // Deserialize user to retrieve user data by ID
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log("Deserializing User:", user);
      console.log(user)
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

