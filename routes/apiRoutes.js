var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/favorites", function(req, res) {
    db.Favorites.findAll({}).then(function(dbFavorites) {
      console.log(dbFavorites);
      res.json(dbFavorites);
    });
  });

  // Create a new example
  app.post("/api/favorites", function(req, res) {
    db.Favorites.create({
      beerName: req.body.beer,
      breweryName: req.body.breweryName,
      webSite: req.body.webSite
    }).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });

  // Delete an example by id
  app.delete("/api/favorites/:id", function(req, res) {
    db.Favorites.destroy({ where: { id: req.params.id } }).then(function(
      dbFavorites
    ) {
      res.json(dbFavorites);
    });
  });
};
