var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var policySchema = new Schema({
  Agent: { type: String, Required: "Product name cannot be left blank." },

  User: { type: String, Required: "Product price cannot be left blank." },

  UserAccount: {
    type: String,
    Required: "Product category cannot be left blank"
  },

  LOB: { type: String },

  carrier: { type: String },

  Policy: { type: String }
});

module.exports = mongoose.model("policy", policySchema);
