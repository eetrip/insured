module.exports = app => {
  const notes = require("../controller/user");

  // Create a new Note
  app.post("/notes/add", notes.create);

  // Retrieve all Notes
  app.get("/notes", notes.findAll);

  // Also retrieves all notes
  app.get("/", notes.findAll);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", notes.findOne);

  // Update a Note with noteId
  app.put("/notes/:noteId", notes.update);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", notes.delete);

  // import csv data to mongo
  app.get("/import", notes.import);
};
