const controller = require("../controllers/order.controller");

module.exports = function (app) {
    app.route('/api/createorder').post(function (req, res) {
        controller.createOrder(req, res)
    })
};
