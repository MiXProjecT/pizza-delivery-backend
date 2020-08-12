const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        type: String,
        description: String,
        price: Number,
        image: String,
    })
);

module.exports = Product;