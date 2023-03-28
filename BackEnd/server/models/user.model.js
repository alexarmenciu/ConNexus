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
  email: String,
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

// Hash the password before saving the user to the database
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
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
