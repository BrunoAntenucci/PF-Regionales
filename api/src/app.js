const express = require("express");
const morgan = require('morgan');
const routes = require("./routes/index");
const passport = require("passport")
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("./passport/local-auth");

const server = express();
server.name= "REGIONALES";

server.use(express.urlencoded({ extended: true, limit: "50mb"}));

const connDB = require('./db.js');
connDB();
server.use(express.json({limit: "50mb"}))
server.use(cookieParser("grupo09"))

server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(session({
  secret: "grupo09",
  resave: true,
  saveUninitialized: true
}))
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) => { //para mostrar el mensaje de flash
  server.locals.singupMessage = req.flash("singupMessage")
  next();
})

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500; //Status = 500 es un error de servidor.
    const message  = err.message || err; //Si es un objeto, guardo el mensaje de ese obj. Y si es un string, lo guardo directamente
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;