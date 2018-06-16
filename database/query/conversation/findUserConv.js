const Conversation = require("../../model/conversation");

const findUserConve = user => {
  const { _id } = user;
  return Conversation.find({ participants: _id })
    .populate("participants")
    .populate({
      path: "messages",
      match: { to: user, seen: false },
      select: "content"
    })
    .sort({ updatedAt: -1 });
};

module.exports = findUserConve;
