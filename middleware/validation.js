const User = require("../database/model/user");
const bcrypt = require("bcrypt-nodejs");
const validator = require("validator");
const passwordValidator = require("password-validator");
const Token = require("../database/model/token");

const schema = new passwordValidator();
schema
  .is()
  .min(6)
  .is()
  .max(15)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .not()
  .spaces();

const register = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).json({
      success: false,
      message: "Please enter username and email and password."
    });
  } else if (!req.body.confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Please confirm your password."
    });
  } else if (req.body.confirmPassword !== req.body.password) {
    res.status(400).json({
      success: false,
      message: "Password does not match the confirm password"
    });
  } else {
    const { email, password, name } = req.body;
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: "email is not valid"
      });
    } else if (!validator.isLength(name, { min: 3, max: 10 })) {
      res.status(400).json({
        success: false,
        message: "name must be between 3 and 10 characters"
      });
    } else if (!schema.validate(password)) {
      res.status(400).json({
        success: false,
        message:
          "password must be between 6 and 15 chars and must have (uppercase letters , lowercase letters,digits,no space)"
      });
    } else {
      User.findOne({ email }).then(user => {
        if (user) {
          res.status(400).json({
            success: false,
            message: "email already exist"
          });
        } else {
          return next();
        }
      });
    }
  }
};

const resetPassword = (req, res, next) => {
  [];
  if (!!req.body.password && !!req.body.confirmPassword) {
    const { password, confirmPassword, token } = req.body;
    if (!password) {
      res.status(400).json({
        success: false,
        message: "please enter a new password"
      });
    } else if (!schema.validate(password)) {
      res.status(400).json({
        success: false,
        message:
          "password must be between 6 and 15 chars and must have (uppercase letters , lowercase letters,digits,no space)"
      });
    } else if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Password does not match the confirm password"
      });
    } else {
      return next();
    }
  } else {
    res.status(400).json({
      success: false,
      message: "please enter a new password"
    });
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      success: false,
      message: "Please enter email and password."
    });
  } else {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "email is not valid" });
    } else {
      User.findOne({ email }).then(user => {
        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "user not found" });
        } else if (!user.isVerified) {
          return res.status(400).json({
            success: false,
            message: "Your account has not been verified"
          });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              req.login = user;
              next();
            } else {
              return res.status(400).json({
                success: false,
                message: "password incorrect"
              });
            }
          });
        }
      });
    }
  }
};

const ad = (req, res, next) => {
  const params = req.body;
  const error = term =>
    res.status(400).json({
      message: `you must provide ${term}`
    });

  if (!params.title) {
    error("title");
  } else if (!params.price) {
    error("price");
  } else if (!params.category) {
    error("category");
  } else if (!params.description) {
    error("description");
  } else if (!params.address) {
    error("address");
  } else if (!params.phone_number) {
    error("phone_number");
  } else if (!validator.isLength(params.title, { min: 3, max: 25 })) {
    res.status(400).json({
      message: `title must be between 3 and 25 characters`
    });
  } else if (!validator.isNumeric(params.price)) {
    res.status(400).json({
      message: `price must be a number`
    });
  } else if (!validator.isLength(params.description, { min: 15 })) {
    res.status(400).json({
      message: `title must be at least 15 characters`
    });
  } else if (!validator.isNumeric(params.phone_number)) {
    res.status(400).json({
      message: `price must be a number`
    });
  } else {
    next();
  }
};

const updateUser = (req, res, next) => {
  const params = req.body;
  if (!!params.name) {
    if (!validator.isLength(params.name, { min: 5, max: 10 })) {
      return res.status(400).json({
        message: "name must be between 5 and 15 characters"
      });
    }
  }
  next();
};

module.exports = { register, login, ad, updateUser, resetPassword };
