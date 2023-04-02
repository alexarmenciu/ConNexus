const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.contact;
const User = db.user;
const mongoose = require('mongoose');

exports.create = async (req, res) => {
// Validate request
  if (!req.body.name || !req.body.uid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Validate User with uid exists
    const user = await User.findById(req.body.uid).session(session);
    if (!user) {
      res.status(400).send({ message: "User does not exist!" });
      return;
    }
    console.log(req.body)
    // Create a Contact
    const contact = new Contact({
      uid: req.body.uid,
      name: req.body.name,
      additionalFields: JSON.stringify(req.body.additionalFields), // convert to string because it's encrypted
    });


    // Save Contact in the database
    await contact.save({ session });

    // Update user's contacts
    user.contacts.push(contact._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

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
  Contact.find({ })
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
