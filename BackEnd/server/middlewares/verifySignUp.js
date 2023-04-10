const db = require("./../models");
const ROLES = db.ROLES;
const mongoose = require("mongoose");
const User = db.user;

/**
 * Check that the roles provided are valid.
 * 
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response} 400 if the role is invalid
 */
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkRolesExisted,
};

module.exports = verifySignUp;
