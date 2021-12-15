const express = require("express");
const planetsRouter = express.Router();

//Destructuring to get our specific function
const { httpGetAllPlanets } = require("./planets.controller");

planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
