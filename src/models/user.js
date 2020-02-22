const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    title: String,
    content: String
  },
  {
    timestamps: true
  }
);

// collection name
module.exports = mongoose.model("notes", Schema);
