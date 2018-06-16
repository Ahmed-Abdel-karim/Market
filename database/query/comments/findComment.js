const Comment = require("../../model/comment");

const findCommnet = _id => {
  return Comment.findById(_id);
};

module.exports = findCommnet;
