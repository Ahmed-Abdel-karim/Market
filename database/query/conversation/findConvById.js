const Conversation = require("../../model/conversation");

const findConvById = _id => {
  return Conversation.findById(_id);
};

module.exports = findConvById;
