module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    beerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    breweryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    webSite: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    }
  });

  return Favorites;
};
