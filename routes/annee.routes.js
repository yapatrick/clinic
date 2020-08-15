module.exports = app => {
  const { authJwt }  = require('../middleware');
  const controller   = require("../controllers/annee.controller");
  var express        = require('express');
  var router         = express.Router();

  app.use(function(req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );

    next();
});


  // Create a new Year(Annee)
  router.post("/", [authJwt.verifyToken, authJwt.isManager], controller.create);

  // Retrieve all Years(Annees)
  router.get("/", [authJwt.verifyToken, authJwt.isManager], controller.findAll);


  // Retrieve a single Year(Annee) with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isManager], controller.findOne);

  // Update a Yaer(Annee) with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isManager], controller.update);

  // Delete a Year(Annee) with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isManager], controller.delete);

  // Delete All Annees
  router.delete("/", [authJwt.verifyToken, authJwt.isManager], controller.deleteAll);

  app.use('/api/annees', router);
};

