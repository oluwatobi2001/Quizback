const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const routes = require('./routes/v1');
const mongoose = require("mongoose") // Assuming Sequelize models are here



const app = express();

app.use(cors({origin: 'http://localhost:5173',  methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorizatiztion", credentials: true}))
// Middleware
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000 // 30 minutes
  }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration

// Database sync
const db = () => {
  mongoose.connect( 'mongodb+srv://tobilyn77:tobilyn77@cluster0.q1jj1nh.mongodb.net/quizy?retryWrites=true&w=majority&appName=Cluster0'  , {useNewUrlParser: true,

  }).then(console.log("connected to mongo db")).catch((err) => console.log(err)); 
 
 
 
}
db ();

// Routes
app.use('/v1', routes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is successfully running on port ${port}`);
});
