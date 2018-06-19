const jwt = require("jsonwebtoken");
const User = require("../database/model/user");
const keys = require("../configue/keys");
const bcrypt = require("bcrypt-nodejs");
const crypto = require("crypto");
const Token = require("../database/model/token");
const authenticationEmails = require("../utils/authenticationEmails");

const register = (req, res, next) => {
  const { email, password, name } = req.body;
  const newUser = new User({ email, password, name });
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, null, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          const token = new Token({
            user: user,
            token: crypto.randomBytes(16).toString("hex"),
            email: user.email
          });

          return token.save();
        })
        .then(token => {
          const msg = {
            to: `${token.email}`,
            from: "no-reply@market.com",
            subject: "MARKET Sign Up Verification",
            html: `<div>
              <h1 style={text-align:center}>Verify your email to sign up for MARKET<h1>
               <p>To complete the signup process, please click on the link below</p>
                <a href="https://market9.herokuapp.com/verification/${
                  token.token
                }">Click</a></div>`
          };
          return authenticationEmails(msg);
        })
        .then(results => {
          return res.json({
            success: true,
            message: `A verification email has been sent to your email `
          });
        })
        .catch(next);
    });
  });
};

const verification = (req, res, next) => {
  const token = req.body.token;
  Token.findOne({ token })
    .then(token => {
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "unable to find a valid token. Your token my have expired"
        });
      } else {
        User.findById(token.user).then(user => {
          if (!user)
            return res.status(400).json({
              success: false,
              message: " unable to find a user for this token"
            });
          if (user.isVerified)
            return res.status(400).json({
              success: false,
              message: "This account has already been verified"
            });
          user.isVerified = true;
          user.save().then(user => {
            return res.json({
              success: true,
              message: "account has been verified"
            });
          });
        });
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { _id, name, avatar, favAds } = req.login;
  const payload = {
    _id,
    name,
    avatar,
    favAds
  };
  jwt.sign(payload, keys.secret, { expiresIn: 360000 }, (err, token) => {
    res.json({
      success: true,
      token: `Bearer ${token}`
    });
  });
};

const resendVerification = (req, res, next) => {
  if (!!req.body.email) {
    const { email } = req.body;
    User.findOne({ email }).then(user => {
      if (!!user) {
        const token = new Token({
          user: user,
          token: crypto.randomBytes(16).toString("hex"),
          email: user.email
        });
        token
          .save()
          .then(token => {
            const msg = {
              to: `${token.email}`,
              from: "no-reply@market.com",
              subject: "MARKET Sign Up Verification",
              html: `<div>
                <h1 style={text-align:center}>Verify your email to sign up for MARKET<h1>
                 <p>To complete the signup process, please click on the link below</p>
                  <a href="https://market9.herokuapp.com/verification/${
                    token.token
                  }">Click</a></div>`
            };
            return authenticationEmails(msg);
          })
          .then(results => {
            return res.json({
              success: true,
              message: `A verification email has been sent to your email `
            });
          })
          .catch(next);
      } else {
        res.status(400).json({
          success: false,
          message: "user not found"
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "you must enter a valid email"
    });
  }
};

const reqResetPassword = (req, res, next) => {
  if (!!req.body.email) {
    const { email } = req.body;
    User.findOne({ email }).then(user => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: "user not found"
        });
      } else {
        const token = new Token({
          user: user,
          token: crypto.randomBytes(16).toString("hex"),
          email: user.email
        });
        token
          .save()
          .then(token => {
            const msg = {
              to: `${token.email}`,
              from: "no-reply@market.com",
              subject: "MARKET Reset Password Link",
              html: `<div>
                  <h1 style={text-align:center}>Reset Password Link<h1>
                   <p>To Reset Your Password, please click on the link below</p>
                    <a href="https://market9.herokuapp.com/reset_password/${
                      token.token
                    }">Click</a></div>`
            };
            return authenticationEmails(msg);
          })
          .then(results => {
            return res.json({
              success: true,
              message: `reset password link has been sent to your email`
            });
          })
          .catch(next);
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: "you must enter a valid email"
    });
  }
};

const verifyPassword = (req, res, next) => {
  const token = req.body.token;
  Token.findOne({ token })
    .then(token => {
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "unable to find a valid token. Your token my have expired"
        });
      } else {
        User.findById(token.user).then(user => {
          if (!user)
            return res.status(400).json({
              success: false,
              message: " unable to find a user for this token"
            });
          return res.json({
            success: true,
            message: "you can reset your password"
          });
        });
      }
    })
    .catch(next);
};

const resetPassword = (req, res, next) => {
  const { token, password } = req.body;
  Token.findOne({ token })
    .then(token => User.findOne(token.user))
    .then(user => {
      return bcrypt.genSalt(10, (err, salt) => {
        return bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          return user.save();
        });
      });
    })
    .then(user => {
      res.json({
        success: true,
        message: "password cahnged please login with the new password"
      });
    });
};

module.exports = {
  register,
  login,
  verification,
  resendVerification,
  verifyPassword,
  reqResetPassword,
  resetPassword
};
