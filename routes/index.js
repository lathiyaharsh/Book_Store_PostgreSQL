const express = require("express");
const routes = express.Router();
const jwtauth = require("../config/middleware");

routes.use("/books", jwtauth, require("./books"));

module.exports = routes;
