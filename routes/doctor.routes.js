module.exports = app => {
    const { authJwt }   = require('../middleware');
    const doctor        = require("../controllers/doctor.controller");

    var express         = require('express');
    var router          = express.Router();
  
    // Create a new doctor
    router.post("/", [authJwt.verifyToken, authJwt.isMedecin], doctor.create);
  
    // Retrieve all doctors
    router.get("/", [authJwt.verifyToken, authJwt.isMedecin], doctor.findAll);

  
    // Retrieve a single doctor with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isMedecin], doctor.findOne);
  
    // Update a doctor with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isMedecin], doctor.update);
  
    // Delete a doctor with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isMedecin], doctor.delete);
  
    // Create all doctors
    router.delete("/", [authJwt.verifyToken, authJwt.isMedecin], doctor.deleteAll);
  
    app.use('/api/doctors', router);
  };
  
  