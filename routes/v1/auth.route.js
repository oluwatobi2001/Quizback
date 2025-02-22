const express = require('express');
const passport = require("passport")
const { login, logout, googleLogin, googleCallback } = require('../../service/auth.service');

const router = express.Router();

router.route("/login").post(login);

router.route("/logout").get(logout)

router.get('/google', passport.authenticate("google", {scope: ["profile", "email"]}))
  
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:5173/welcome');
  }
);
  

module.exports = router;