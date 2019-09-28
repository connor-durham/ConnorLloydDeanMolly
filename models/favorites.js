module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      len: [1]
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      len: [1]
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Favorites;
};
