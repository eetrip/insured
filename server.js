// Import express
const express = require("express");
const app = express();

const mongoClient = require("mongodb").MongoClient,
  assert = require("assert");

// mongoClient.Promise = global.Promise;

// Server up and running on port 3000
const server = app.listen(3000, (err, callback) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server listening on port 3000");
  }
});

// Mongodb Connection URL
const url = "mongodb://localhost:27017/insured";

// app.use("/src/routes", route);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "WELCOME" });
});

app.all("/*", (req, res, next) => {
  return res.status(NOT_FOUND).json({ message: "Not Found" });
});

// Use connect method to connect to the Server
mongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, db) => {
    assert.equal(null, err);

    console.log("Connected succesfully to mongodb");

    // insertDocuments(db, function() {
    //   db.close();
    // });
  }
);
