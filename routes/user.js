const express = require("express");
const routes = express.Router();
const jwtauth = require("../config/middleware");
const { uploadImgPath } = require("../models/user");
const { login, profile, signup, remove } = require("../controller/user");

routes.post("/login", login);

routes.use(jwtauth);
routes.post("/signup", uploadImgPath, signup);
routes.get("/profile", profile);
routes.delete("/remove", remove);

module.exports = routes;
