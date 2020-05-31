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
};
