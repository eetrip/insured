import { Router } from "express";
var express = require("express");
var csv = require("fast-csv");
import { getUserPolicy } from "../controller/user";
var fs = require("fs");
//var router = express.Router();
var app = express();

var mongoose = require("mongoose");

var Product = mongoose.model("Products");

app.use(express.static(__dirname));

// directory for csv file
var csvfile = __dirname + "directory for csv file";
var stream = fs.createReadStream(csvfile);

const routes = new Router();

// routes.get("/user", getUserPolicy);

Router.get("/", function() {
  console.log(`
  XXXXXXXX---working---XXXXXXXXX
  `);
});

routes.get("/import", function() {
  var products = [];
  console.log("CCCSSSSVVV data incoming");
  var csvStream = csv()
    .on("data", function(data) {
      var item = new products({
        Agent: data[0],
        User: data[1],
        UserAccount: data[2],
        LOB: data[3],
        carrier: data[4],
        Policy: data[5]
      });

      item.save(function(error) {
        console.log(item);
        if (error) {
          throw error;
        }
      });
    })
    .on("end", function() {});

  stream.pipe(csvStream);
  console.log("DATA IMPORTED SUUCESSFULLY");
});

routes.get("fetchdata", function() {
  Product.find({}, function() {
    if (!err) {
      console.log("UPDATED SUCCESSFULLY");
    } else {
      throw err;
    }
  });
});

routes.get("/*", function() {
  console.log(`
    INVALID ROUTE
    `);
});

// export default Router;
// module.exports = Router;
export default routes;
