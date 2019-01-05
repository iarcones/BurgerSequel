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
        /////
        // Books.findAll({
        //     include : { //<------ By this you can use association
        //         model : User ,
        //         where : { id : YOUR_USER_ID }
        //     },
        //     where : { status : 'borrowed' }    
        // }).then(books => {
        //     if(books.length > 0) {
        //         console.log(books);
        //     } else {
        //         console.log("No books found");
        //     }
        // })

        db.Customerburger.findAll({
            where: {
                CustomerId: customerId,
            }
        }).then(function (dbBurgerCustomer) {
            hbsObject.burgerscustomer = dbBurgerCustomer;
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
    burger = req.params.id;
    client = req.params.customerId;

    db.Burger.increment('burger_counter', { where: { id: req.params.id } }).then(function (data) {
        console.log("data when update the counter on burger")
        console.log(data[0][1]);
        console.log("data before creating: ", burger, client);
        db.Customerburger.increment('counter', { where: { BurgerId: burger, CustomerId: client } }).then(function (data) {
            console.log("inside function increment customerburger");
            console.log("data: ", data);
            console.log(data[0][1]);
            /// if rec doesn't exist create and counter = 1;
            if (data[0][1] === (0)){
                console.log("data for creating: ", burger, client);
                db.Customerburger.create(
                    {
                        BurgerId: burger,
                        CustomerId: client
                    })
                    .then(function (dbcustomerburger) {
                        console.log(dbcustomerburger)
                        //res.json(dbcustomerburger);
                    });
            }
            
        });
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