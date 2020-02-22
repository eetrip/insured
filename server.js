const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const url = "mongodb://localhost:27017/data";
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// Connecting to the database
mongoose
  .connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "this app is working"
  });
});

require("./src/routes/routes")(app);

// listen for requests || change port.
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server Lisening On Port : " + port);
});
