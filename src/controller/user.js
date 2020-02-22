const Note = require("../models/user");
var express = require("express");
var csv = require("fast-csv");
var fs = require("fs");
var app = express();

app.use(express.static(__dirname));
// app.use(express.static(__filename));

var csvFile = __dirname + "/../public/data.csv";
var stream = fs.createReadStream(csvFile);

// importing data
exports.import = (req, res) => {
  // var products = [];

  var csvStream = csv()
    .on("data", function(data) {
      const note = new Note({
        title: data[0],
        content: data[1]
      });

      console.log(`
      THIS IS DATA ${data}
      `);

      note.save(function(error) {
        console.log("item");
        if (error) {
          throw error;
        }
      });
    })

    .on("end", function() {});

  console.log(`
  this is the csv data ${csv}
  `);

  stream.pipe(csvStream);
  res.json({ success: "data imported successfully", status: 200 });
};

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  } else {
    // Create a Note
    const note = new Note({
      title: req.body.title || "Untitled Note",
      content: req.body.content
    });

    console.log(note);

    // Save Note in the database
    note
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
        });
      });
  }
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then(boates => {
      res.send(boates);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      content: req.body.content
    },
    { new: true }
  )
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
};
