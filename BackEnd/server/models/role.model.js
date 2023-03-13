const mongoose = require("mongoose");

//TODO: add a few things to have more fields
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;