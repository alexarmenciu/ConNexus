//TODO: model for contacts

const mongoose = require("mongoose");

// TODO: Set the primary to be the user id and name. This will not allow for multiple contacts with the same name for a given user.
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    uid:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    additionalFields: {
      type: Map,
      of: String,
    },
  })
);

module.exports = Contact;
