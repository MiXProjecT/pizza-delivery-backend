const {authJwt} = require("../middlewares");
const controller = require("../controllers/user.controller");
const order = require("../controllers/order.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api", controller.allAccess);

    app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/showorders",
        authJwt.verifyToken, order.showOrders
    )
};
