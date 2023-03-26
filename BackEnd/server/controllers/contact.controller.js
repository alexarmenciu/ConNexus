const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.contact;
const User = db.user;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.uid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // validate User with uid exists
  const userExists = await User.exists({ _id: req.body.uid });
  if (!userExists) {
    res.status(400).send({ message: "User does not exist!" });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    uid: req.body.uid,
    name: req.body.name,
    additionalFields: req.body.additionalFields,
  });

  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Contact.",
      });
    });
};

exports.findAll = (req, res) => {
  // get all contacts from database matching a given uid
  Contact.find({ uid: req.body.uid })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving all contacts.",
      });
    });
};

exports.findByName = (req, res) => {
  // get all contacts that match a given name from database
  Contact.find({ name: req.params.name, uid: req.body.uid })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving all contacts.",
      });
    });
};

exports.deleteContact = (req, res) => {
  // delete a contact from database
  Contact.deleteOne({ name: req.params.name, uid: req.body.uid })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while deleting the contact.",
      });
    });
};

exports.updateContact = (req, res) => {
  // update a contact in the database
  Contact.updateOne(
    { name: req.params.name, uid: req.body.uid },
    { $set: req.body }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while updating the contact.",
      });
    });
};
