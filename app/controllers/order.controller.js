const db = require("../models");
const Order = db.order;
const Product = db.product;

exports.createOrder = (req, res) => {
    const order = new Order({
        user_id: req.body.user_id,
        date: Date.now(),
        address: req.body.address,
        total_price: 0,
        phone_number: req.body.phone_number
    });

    order.save((err, order) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        Product.find(
            {
                name: {
                    $in: Array.from(req.body.cart).map(([key, value]) => (
                        key
                    ))
                }

            },
            (err, cart) => {


                let temp1 = []
                let product_id = cart.map(product => product.id);
                let product_price = cart.map(product => product.price)
                let count_array = Array.from(req.body.cart).map(([key, value]) => (
                    value['count']
                ))
                for (let z = 0; z < cart.length; z++) {
                    order.total_price += product_price[z] * count_array[z]
                }
                order.total_price += 10;
                for (let i = 0; i < cart.length; i++) {
                    temp1.push({
                        product: product_id[i],
                        count: count_array[i]

                    })
                }

                order.cart = temp1
                if (err) {
                    res.status(500).send({message: err});
                    return;
                }


                order.save(err => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    res.send({message: "Order was created successfully!"});
                });
            }
        );
    });
};


exports.showOrders = (req, res) => {
    Order.find({
        user_id: req.query.user_id
    })
        .sort({_id: -1})
        .populate('cart.product')
        .exec((err, order) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            res.status(200).send({
                order
            })
        });

};