const db = require("../models");
const Product = db.product;

exports.allAccess = (req, res) => {
    Product.find({}, function (err, menu) {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send(menu)
    })

};


exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

