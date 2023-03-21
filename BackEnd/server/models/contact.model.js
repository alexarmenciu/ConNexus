//TODO: model for contacts

const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    name: String,
    additionalFields: {
      type: Map,
      of: String,
    },
  })
);
