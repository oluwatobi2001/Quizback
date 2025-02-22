const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const login = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Authentication failed'));
    }
    if (!user) {
      console.log(err)
      return next(new ApiError(httpStatus.UNAUTHORIZED, info.message || 'Login failed'));
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log(err)
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Login failed'));
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

const googleLogin = async (req, res, next) => {
  console.log("hello")
 passport.authenticate('google', { scope: ['profile', 'email'] });
}
const googleCallback = async(req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('http://localost:3000/exam');
    }
}
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed', error: err });
    }
    req.session.destroy(); // Optionally destroy the session after logging out
    return res.json({ message: 'Logout successful' });
  });
};

module.exports = { login, logout, googleLogin, googleCallback };


