const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const server = http.createServer(app);
const { loadPlanetsData } = require("./Models/planets.model");
const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://mohsin:database@nasacluster.jmsgg.mongodb.net/nasa?retryWrites=true&w=majority";

//Checking if we are connected or there is any error
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we are connected");
});
async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`);
  });
}
startServer();
