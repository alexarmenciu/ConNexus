const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //get
  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/getusers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get(
    "/api/getuser/:id",
    [authJwt.verifyToken],
    controller.show
  );

  // patch
  app.patch(
    "/api/updateuser/:id",
    [authJwt.verifyToken],
    controller.update
  );

  // delete
  app.patch(
    "/api/deleteuser/:id",
    [authJwt.verifyToken],
    controller.delete
  );
};
