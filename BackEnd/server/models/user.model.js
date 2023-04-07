const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Contact = require("./contact.model");
const ObjectId = mongoose.Types.ObjectId;

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
  ],
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact"
    }
  ]
});

// Delete all contacts associated with the user before removing the user
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

// Compare the entered password with the hashed password in the database
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

UserSchema.statics.getAll = async function () {
  return await this.find({});
};

UserSchema.statics.updateById = async function(id, data) {
  const options = { new: true, useFindAndModify: false };
  return await this.findOneAndUpdate({ _id: id }, data, options);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
