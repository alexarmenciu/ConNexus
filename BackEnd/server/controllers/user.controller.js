const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Contact = db.contact;
const mongoose = db.mongoose;
const ObjectId = mongoose.Types.ObjectId;
var bcrypt = require("bcryptjs");

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

/**
 * Get all users.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 500 if there is an error. Otherwise, the users.
 */
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

/**
 * Get a user by id.
 * The request params must contain an id.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 404 if the user is not found. 500 if there is an error. Otherwise, the user.
*/
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
};

/**
 * Update an existing user.
 * The request params must contain an id.
 * The request body must contain the new username and password.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 404 if the user is not found. 500 if there is an error. Otherwise, the user.
 */
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // check that old password is correct
  const user = await User.findById(ObjectId(req.params.id));
  var passwordIsValid = bcrypt.compareSync(
    req.body.oldpassword,
    user.password
  );

  // make sure id is correct
  if (user === null) {
    res.status(404).send({
      message: `Couldn't find user with id ${req.params.id}.`,
    });
  } else if (!passwordIsValid) {
    res.status(401).send({
      message: "Old password is incorrect!",
    });
  } else {
    // update the user
    user.username = req.body.newusername;
    user.password = bcrypt.hashSync(req.body.newpassword, 8);
    user.save((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "An error occurred while updating the user.",
        });
        console.error("Error", err);
      } else {
        var oldU = JSON.stringify(req.body.oldusername);
        var newU = JSON.stringify(req.body.newusername);
        if(oldU == newU){
          res.send({ data, message: "Password was changed successfully!" });
        }
        else{
          res.send({ data, message: "Username was changed successfully!" });
        }
        
        console.log("Success", data);
      }
    });
  }
};

/**
 * Delete a user.
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} 404 if the user is not found. 500 if there is an error. Otherwise, the user.
 */
exports.delete = async (req, res) => {
  try {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // check that old password is correct
  const user = await User.findById(ObjectId(req.params.id));
  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  // make sure id is correct
  if (user === null) {
    res.status(404).send({
      message: `Couldn't find user with id ${req.params.id}.`,
    });
  } else if (!passwordIsValid) {
    res.status(401).send({
      message: "Old password is incorrect!",
    });
  } 
  else{
    const data = await User.deleteOne(ObjectId(req.params.id));
    if (data === null) {
      res.status(404).send({
        message: `Couldn't find user with id ${req.params.id}.`,
      });
    } else {
      res.send({ message: `User was deleted successfully!` });
    }
  }
    
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Could not delete user with id " + req.params.id,
    });
  }
};
