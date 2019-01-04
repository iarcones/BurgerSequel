var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");


router.get("/", function (req, res) {
    // get the user local storage to show the column of user burgers and button to reorder
    
    // var customerName = localStorage.getItem("customersburger");

    db.burgers.findAll({}).then(function (dbBurger) {
        db.Customerburger.findAll({
            where: {
                CustomerId: customerId,
            }
        }).then(function (dbBurgerCustomer) {

            var hbsObject = {
                burgers: dbBurger,
                burgerscustomer: dbBurgerCustomer
            };
            console.log(hbsObject);
            res.render("index", hbsObject);
         
        });
      
    });


    //var customerName = localStorage.getItem("customersburger");
    // db.burgers.findAll({}).then(function (dbBurger) {
    //     var hbsObject = {
    //         burgers: dbBurger
    //     };
    //     console.log(hbsObject);
    //     res.render("index", hbsObject);
    // });
    
    //   topicsSTR = localStorage.getItem("movies");
    //   console.log("topicsSTR: " + topicsSTR);
    //   topics = topicsSTR.split(",");
    //   console.log("topics: " + topics);

    // // Adding topic from the textbox to our array
    // topics.push(topic);
    // localStorage.clear();
    // localStorage.setItem("movies", topics);
});

router.post("/api/burgers", function (req, res) {
    console.log("creating: ", req.body.name);
    db.burgers.create({
        burger_name: req.body.name,
    })
        .then(function (dbBurger) {
            res.json(dbBurger);
        });
});


router.put("/api/devoured/:id/:customerId", function (req, res) {
    console.log("devoured: ", req)
    
    db.Customerburger.create(
        {
            burger_id: req.params.id,
            CustomerId: req.params.customerId
        })
        .then(function(dbcustomerburger) {
            console.log(dbcustomerburger)
          //res.json(dbcustomerburger);
        });
});

router.post("/api/customers", function (req, res) {
    console.log("creating: ", req.body.name);
    db.Customer.create({
        customer_name: req.body.name,
    })
        .then(function (dbCustomer) {
            console.log(dbCustomer)
            res.json(dbCustomer);
        });
});


// Export routes for server.js to use.
module.exports = router;