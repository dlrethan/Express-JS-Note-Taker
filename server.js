const express = require("express");

const fs = require("fs");

const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;

const notes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  res.json(notes).slice(1);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function newNote(body, notesList) {
  const note = body;
  body.id = notesList[0];
  notesList.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesList, null, 1)
  );
  return note;
}
app.post("/api/notes", (req, res) => {
  const note = newNote(req.body, notes);
  console.log(`This is the note: ${note}`);
  res.json(note);
});
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
