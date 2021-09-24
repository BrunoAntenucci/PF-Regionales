const express = require("express");
const cors = require("cors");
const passport = require("passport")
const cookieParser = require('cookie-parser');
const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const routes = require("./routes/index");
const flash = require("connect-flash");
const createRoles = require("./libs/initialSetup")
//const cookieSession = require("cookie-session");
const server = express();
createRoles(server);
server.name= "REGIONALES";
//--------------------------------DATABASE------------------------------------------------------------//
const connDB = require('./db.js');
connDB();
//--------------------------------MIDDLEWARE----------------------------------------------------------//
server.use(morgan('dev'));
server.use(flash());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true}));
server.use(express.json());
server.use(cors({

  origin: "http://localhost:3000", // DEPLOY: https://pf-regionales.vercel.app // DEV: http://localhost:3000
  credentials: true
}));
server.use(session({
  secret: "regionales",
  resave: true,
  saveUninitialized: true
}));
server.use(cookieParser("regionales"));
server.use(passport.initialize());
server.use(passport.session());
require("./passport/local-auth")(passport);
server.use((req, res, next) => { //para mostrar el mensaje de flash
  server.locals.singupMessage = req.flash("singupMessage")
  next();
})
//--------------------------------ROUTES-------------------------------------------------------------//
server.use("/", routes);

//--------------------------------CONTROL GENERALIZADO DE ERRORES-----------------------------------//
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500; //Status = 500 es un error de servidor.
  const message  = err.message || err; //Si es un objeto, guardo el mensaje de ese obj. Y si es un string, lo guardo directamente
  console.error(err);
  res.status(status).send(message);
});
//--------------------------------EXPORT------------------------------------------------------------//
module.exports = server;

