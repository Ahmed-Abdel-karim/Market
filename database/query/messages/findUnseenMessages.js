const Message = require("../../model/message");

const findUnseenMessages = user =>
  Message.find({ $and: [{ to: user }, { seen: false }] }).count();

module.exports = findUnseenMessages;
