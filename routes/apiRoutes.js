const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uuidv1 = require("uuid/v1");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
  app.post("/api/notes", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      const noteArr = JSON.parse(data);
      let newNote = req.body;
      newNote.id = uuidv1();
      noteArr.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(noteArr), (err, data) => {
        if (err) throw err;
        res.send(data);
      });
    });
  });
  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const noteArr = JSON.parse(data);

      let delNote = req.params.id;

      let updatedNotesArr = [];
      for (let i = 0; i < noteArr.length; i++) {
        if (noteArr[i].id != delNote) {
          updatedNotesArr.push(noteArr[i]);
        }
      }
      fs.writeFile(
        "db/db.json",
        JSON.stringify(updatedNotesArr),
        (err, data) => {
          if (err) throw err;
          console.log("Note Successfully Deleted");
          res.send(data);
        }
      );
    });
  });
};
