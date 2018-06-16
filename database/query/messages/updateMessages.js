const Message = require("../../model/message");

const updateMessages = (user, friend, _id) => {
  if (!!user && !!friend) {
    return Message.updateMany(
      { $and: [{ to: user }, { from: friend }, { seen: false }] },
      { seen: true }
    );
  } else {
    return Message.findByIdAndUpdate(_id, { seen: true });
  }
};

module.exports = updateMessages;
