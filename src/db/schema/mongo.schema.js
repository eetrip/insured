var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var policySchema = new Schema({
  Agent: { type: String },

  User: { type: String },

  UserAccount: { type: JSON },

  LOB: { type: String },

  carrier: { type: String },

  Policy: { type: String }
});

module.exports = mongoose.model("policy", policySchema);
