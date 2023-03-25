const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
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
