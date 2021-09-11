const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user/user");
const Role = require("../models/role/role"); 



const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) return res.status(400).json({ message: "Invalid Token" });
  
    try {
      const decoded = jwt.verify(token, config.SECRET);
      req.userId = decoded.id;
  
      const user = await User.findById(req.userId, { password: 0 });
      if (!user) return res.status(404).json({ message: "No user found" });
  
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
  };


  const isSuperAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superAdmin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require superAdmin Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };


  const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };

  module.exports =  verifyToken, isSuperAdmin, isAdmin;