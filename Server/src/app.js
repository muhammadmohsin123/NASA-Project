const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const planetsRouter = require("./Routes/planets/planets.router");
const launchesRouter = require("./Routes/launches/launches.router");
const morgan = require("morgan");
//MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//LOGING MIDDLEWARE
app.use(morgan("combined"));
//JSON READING MIDDLEWARE
app.use(express.json());
//SERVING FRONTEND
app.use(express.static(path.join(__dirname, "..", "public")));
//MOUNTING THE MIDDLEWARE ON PATH
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
