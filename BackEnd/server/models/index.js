const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

console.log((db.user));

//roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;