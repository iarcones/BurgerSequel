
console.log("burger model");
module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define("burgers", {
    burger_name: DataTypes.STRING,
    devoured: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
  Burger.associate = function(models) {
    // associations can be defined here
  };
  // Syncs with DB
  // Burger.sync();
  return Burger;
};