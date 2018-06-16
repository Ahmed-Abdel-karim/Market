const User = require("../../model/user");
const Token = require("../../model/token");

const findUser = _id => {
  return User.findById(_id);
};

module.exports = findUser;
