import { Router } from "express";
var express = require("express");
var csv = require("fast-csv");
import { getUserPolicy } from "../controller/user";
var fs = require("fs");
var router = express.Router();
var app = express();

var mongoose = require("mongoose");

var Product = mongoose.model("Products");

app.use(express.static(__dirname));

// directory for csv file
var csvfile = __dirname + "directory for csv file";
var stream = fs.createReadStream(csvfile);

const routes = new Router();

// routes.get("/user", getUserPolicy);

router.get("/", function() {
  console.log(`
  XXXXXXXX---working---XXXXXXXXX
  `);
});

router.get("/import", function() {
  var products = [];
  console.log("CCCSSSSVVV data incoming");
  var csvStream = csv()
    .on("data", function(data) {
      var item = new products({
        name: data[0],
        price: data[1],
        category: data[2],
        description: data[3],
        manufacture: data[4]
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

router.get("fetchdata", function() {
  Product.find({}, function() {
    if (!err) {
      console.log("UPDATED SUCCESSFULLY");
    } else {
      throw err;
    }
  });
});

router.get("/*", function() {
  console.log(`
    INVALID ROUTE
    `);
});

export default routes;
