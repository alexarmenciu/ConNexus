const controller = require("../controllers/contact.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //POST for creating a new contact
  app.post("/api/putcontact",
    // [authJwt.verifyToken],
    controller.create
  );

  //GET for getting all contacts
  app.post("/api/getcontacts", controller.findAll);

  //GET for getting all contacts with a given name
  app.get(
    "/api/getcontacts/:name",
    [authJwt.verifyToken],
    controller.findByName
  );

  //DELETE for deleting a contact
  app.delete(
    "/api/deletecontacts/:name",
    [authJwt.verifyToken],
    controller.deleteContact
  );

  //UPDATE for updating a contact
  app.patch(
    "/api/updatecontact/:oldname",
    //[authJwt.verifyToken],
    controller.updateContact
  );
};
