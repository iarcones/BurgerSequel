var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");



router.get("/", function (req, res) {
    console.log("req.cookies");
    console.log(req.cookies);

    var customerName = req.cookies.customername;
    var customerId = req.cookies.customerid;
    console.log("customerName: ", customerName);

    // var customerId = readCookie("customerid");

    db.Burger.findAll({}).then(function (dbBurger) {
        var hbsObject = {
            burgers: dbBurger
        };
        console.log("--------------");
        console.log(hbsObject);

        db.Customerburger.findAll({
            where: {
                CustomerId: customerId,
            }
        }).then(function (dbBurgerCustomer) {
            hbsObject.burgerscustomer = dbBurgerCustomer;
            
            console.log("--------------");
            console.log(hbsObject);
            res.render("index", hbsObject);
        });

    });
});

router.post("/api/burgers", function (req, res) {
    console.log("creating: ", req.body.name);
    db.Burger.create({
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
            BurgerId: req.params.id,
            CustomerId: req.params.customerId
        })
        .then(function (dbcustomerburger) {
            console.log(dbcustomerburger)
            //res.json(dbcustomerburger);
        });
});

router.post("/api/customers", function (req, res) {
    console.log("creating: ", req.body.name);
    db.Customer.create({
        customer_name: req.body.name,
    }).then(function (dbCustomer) {
        console.log(dbCustomer);
        res.json(dbCustomer);
    });
});


module.exports = router;