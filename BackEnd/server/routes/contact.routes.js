const controller = require("../controllers/contact.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  //POST for creating a new contact
  app.post("/api/putcontact", controller.create);

  //GET for getting all contacts
  app.get("/api/getcontacts", controller.findAll);

  //GET for getting all contacts with a given name
  app.get("/api/getcontacts/:name", controller.findByName);

  //DELETE for deleting a contact
  app.delete("/api/deletecontacts/:name", controller.deleteContact);

  //UPDATE for updating a contact
  app.put("/api/updatecontact/:name", controller.updateContact);
};
