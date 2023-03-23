//TODO: model for contacts

const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    uid: String,
    additionalFields: {
      type: Map,
      of: String,
    },
  })
);

module.exports = Contact;
