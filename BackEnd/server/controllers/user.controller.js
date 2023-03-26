const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const mongoose = db.mongoose;
const ObjectId = mongoose.Types.ObjectId;

//Show here the different privacy content
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create the user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, // the hashing is done in the model before saving
  });

  // Save the user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

exports.show = (req, res) => {
  User.findById(ObjectId(req.params.id), (err, data) => {
    if (err) {
      console.error(err); 
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Couldn't find user with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
}

exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // validate username is not in the body
  if (req.body.username) {
    res.status(400).send({
      message: "Username cannot be changed.",
    });
    return;
  }

  try {
    const data = await User.updateById(
      ObjectId(req.params.id),
      req.body
    );
    if (data === null) {
      res.status(404).send({
        message: `Couldn't find user with id ${req.params.id}.`,
      });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating user with id " + req.params.id,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await User.deleteOne(ObjectId(req.params.id));
    if (data === null) {
      res.status(404).send({
        message: `Couldn't find user with id ${req.params.id}.`,
      });
    } else {
      res.send({ message: `User was deleted successfully!` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Could not delete user with id " + req.params.id,
    });
  }
}
