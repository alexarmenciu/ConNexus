const controller = require("../controllers/contact.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //POST for creating a new contact
  app.post("/api/user/:uid/contacts",
    [authJwt.verifyToken],
    controller.create
  );

  //GET for getting all contacts
  app.get("/api/user/:uid/contacts", 
    [authJwt.verifyToken],
    controller.findAll
  );

  //DELETE for deleting a contact
  app.delete(
    "/api/user/:uid/contacts/:cid",
    [authJwt.verifyToken],
    controller.deleteContact
  );

  //UPDATE for updating a contact
  app.patch(
    "/api/user/:uid/contacts/:cid",
    [authJwt.verifyToken],
    controller.updateContact
  );
};
