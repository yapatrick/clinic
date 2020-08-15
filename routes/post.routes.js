module.exports = app => {
    const { authJwt }   = require('../middleware');
    const controller    = require("../controllers/post.controller");
    var express         = require('express');
    var router          = express.Router();

    // Create a new patient
    router.post("/", [authJwt.verifyToken, authJwt.isGestionnaire],  controller.create);
  
    // Retrieve all patients
    router.get("/", [authJwt.verifyToken, authJwt.isGestionnaire], controller.findAll);

  
    // Retrieve a single patient with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isGestionnaire], controller.findOne);
  
    // Update a patient with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isGestionnaire], controller.update);
  
    // Delete a patient with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isGestionnaire], controller.delete);
  
    // Create all patients
    router.delete("/", [authJwt.verifyToken, authJwt.isGestionnaire], controller.deleteAll);
  
    app.use('/api/posts', router);
  };
  
  