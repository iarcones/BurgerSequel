
console.log("customer model");
module.exports = (sequelize, DataTypes) => {
  
  const Customer = sequelize.define("Customer", {
    customer_name: DataTypes.STRING,
  });
  Customer.associate = function(models) {
    console.log("inside customer  associate")
    console.log(models)
    Customer.hasMany(models.Customerburger);
    };
    // associations can be defined here
  
  // Syncs with DB
  // Customer.sync();
  return Customer;
};

