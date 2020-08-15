const { authJwt }  = require('../middleware');
const controller   = require("../controllers/user.controller");

module.exports = function(app){

    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get("/api/all", controller.allAccess);

    app.get(
        "/api/med", 
        [authJwt.verifyToken, authJwt.isMedecin],
        controller.medecinBoard
    );

    app.get(
        "/api/manag",
        [authJwt.verifyToken, authJwt.isManager],
        controller.managerBoard
    );

    app.get(
        "/api/ges",
        [authJwt.verifyToken, authJwt.isGestionnaire],
        controller.gestionnaireBoard
    );

    app.get(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

}