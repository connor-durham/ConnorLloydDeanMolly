//var db = require("../models");
var path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/maps", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/maps.html"));
  });
  app.get("/favorites", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/favorites.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
