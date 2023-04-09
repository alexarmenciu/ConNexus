const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.contact;
const User = db.user;
const mongoose = require('mongoose');

exports.create = async (req, res) => {
// Validate request
  if (!req.body.name || !req.params.uid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Validate User with uid exists
    const user = await User.findById(req.params.uid).session(session);
    if (!user) {
      res.status(400).send({ message: "User does not exist!" });
      return;
    }
    let fields = new Map();
    req.body.additionalFields.forEach(field => { 
      if(field.label != "") {
        fields.set(field.label, field.value)
      }
    });
    // Create a Contact
    const contact = new Contact({
      uid: req.params.uid,
      name: req.body.name,
      additionalFields: fields,
    });


    // Save Contact in the database
    await contact.save({ session });

    // Update user's contacts
    user.contacts.push(contact._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();
    console.log(req.body.name, "added")
    res.send(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "An error occurred while creating the Contact.",
    });
  }
};

exports.findAll = (req, res) => {
  // get all contacts from database matching a given uid
  Contact.find({uid: req.params.uid})
    .then((data) => {
      console.log(data);
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
  Contact.find({ name: req.params.name, uid: req.params.uid })
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
  Contact.deleteOne({ name: req.params.name, uid: req.params.uid })
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
  console.log(req.body);
  //change additionalfields to map object
  let fields = new Map();
  req.body.additionalFields.forEach(field => { 
    if(field.label != "") {
      fields.set(field.label, field.value)
    }
  });

  req.body.additionalFields = fields;
  console.log(req.body);
  // update a contact in the database
  Contact.updateOne(
    { name: req.params.oldname, uid: req.params.uid },
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
