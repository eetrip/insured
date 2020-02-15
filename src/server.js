// Import express
const express = require("express");
const app = express();

const mongoClient = require("mongodb").MongoClient,
  assert = require("assert");

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

// Use connect method to connect to the Server
mongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  console.log("Connected succesfully to server");

  insertDocuments(db, function() {
    db.close();
  });
});
