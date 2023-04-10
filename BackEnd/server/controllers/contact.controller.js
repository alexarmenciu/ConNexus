const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.contact;
const User = db.user;
const mongoose = require('mongoose');

/**
 * Create a new contact.
 * The associated user must exist, and the uid must be provided in the request params.
 * The request body must contain a name and the additional fields.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, returns the newly created contact.
 */
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

/**
 * Get all contacts for a given user.
 * The associated user must exist, and the uid must be provided in the request params.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, returns all contacts for the given user.
 */
exports.findAll = (req, res) => {
  // get all contacts from database matching a given uid
  Contact.find({uid: req.params.uid})
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

/**
 * Get all contacts for a given user that match a given name.
 * The associated user must exist, and the uid must be provided in the request params.
 * The contact name must be provided in the request params.
 * Since we encrypt all contact names, this endpoint is not valid.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, returns all contacts for the given user that match the given name.
*/
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

/**
 * Delete a contact for a given user.
 * The associated user must exist, and the uid must be provided in the request params.
 * The contact id must be provided in the request params.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, returns the deleted contact.
*/
exports.deleteContact = (req, res) => {
  // delete a contact from database
  Contact.deleteOne({ _id: req.params.cid, uid: req.params.uid })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while deleting the contact.",
      });
    });
};

/**
 * Update a contact for a given user.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, returns the updated contact.
 */
exports.updateContact = (req, res) => {
  //change additionalfields to map object
  let fields = new Map();
  req.body.additionalFields.forEach(field => { 
    if(field.label != "") {
      fields.set(field.label, field.value)
    }
  });

  req.body.additionalFields = fields;
  // update a contact in the database
  Contact.updateOne(
    { _id: req.params.cid, uid: req.params.uid },
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
