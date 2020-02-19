// Import express
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const express = require("express");
const app = express();

if (cluster.isMaster) {
  console.log(`master ${process.pid} is running`);

  // Fork Worker
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (Worker, code, signal) => {
    console.log(`worker ${Worker.process.pid} died`);
  });
} else {
  const server = app.listen(3000, (err, callback) => {
    if (err) {
      console.log(err);
    } else {
      console.log("server listening on port 3000");
    }
  });
}

const mongoClient = require("mongodb").MongoClient,
  assert = require("assert");

// mongoClient.Promise = global.Promise;

// Server up and running on port 3000
// const server = app.listen(3000, (err, callback) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("server listening on port 3000");
//   }
// });

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

    console.log(`
    Connected succesfully to mongodb
    `);

    // insertDocuments(db, function() {
    //   db.close();
    // });
  }
);
