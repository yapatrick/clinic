const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//Route for Signup
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  //Route for SignIn 
  app.post("/api/auth/signin", controller.signin);

  //Retrieves all users 
  app.get("/api/users", controller.findAll);

  //Route to retrieves a user by Id
  app.get("/api/users/id", controller.findOne);

  //Route to deleting a user by id
  app.delete("/api/users/id", controller.delete);

  //Route to update user with an Id
  app.put("/api/users/id", controller.update);

};