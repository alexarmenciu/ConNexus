const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Contact = require("./contact.model");
const ObjectId = mongoose.Types.ObjectId;

/**
 * User schema
 * 
 * @type {mongoose.Schema}
 * @property {string} username - The username of the user
 * @property {string} password - The password of the user
 * @property {ObjectId[]} roles - The roles of the user
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});

/**
 * Before deleting a user, delete all of their contacts.
 * 
 * @param {Function} next - The next function to call
 * @returns {void}
 */
UserSchema.pre('deleteOne', async function(next) {
  const id = this.getQuery()['_id'];
  const contact = await Contact.find({ uid: id });
  try {
    await Contact.deleteMany({ _id: { $in: contact } });
    next();
  } catch(err) {
    next(err);
  }
});

/**
 * Helper method for validating user's password.
*/
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

/**
 * Helper method for getting all users.
 */
UserSchema.statics.getAll = async function () {
  return await this.find({});
};

/**
 * Helper method for getting user by id.
 * 
 * @param {string} id - The id of the user
 * @param {map} data - The data to update
 * @returns {User} The updated user
 */
UserSchema.statics.updateById = async function(id, data) {
  const options = { new: true, useFindAndModify: false };
  return await this.findOneAndUpdate({ _id: id }, data, options);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
