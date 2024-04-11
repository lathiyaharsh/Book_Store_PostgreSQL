const express = require("express");
const routes = express.Router();
const { create, list, findOne, update, remove } = require("../controller/book");

routes.post("/", create);
routes.get("/", list);
routes.get("/:id", findOne);
routes.put("/:id", update);
routes.delete("/:id", remove);

module.exports = routes;
