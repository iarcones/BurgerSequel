
console.log("customerburgers model");
module.exports = (sequelize, DataTypes) => {
  const Customerburger = sequelize.define("Customerburger", {
    burger_id: DataTypes.INTEGER,
    devoured: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  Customerburger.associate = function(models) {
    // associations can be defined here
    console.log("inside customer burger associate")
    console.log(models)
    Customerburger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Syncs with DB
  // Customerburger.sync();
  return Customerburger;
};

