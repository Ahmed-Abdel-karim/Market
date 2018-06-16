const Conversation = require("../../model/conversation");

const findConv = (user_1, user_2, sender_id, receiver_id) => {
  return Conversation.findOne({
    participants: { $all: [user_1._id, user_2._id] }
  }).then(conv => {
    const sender = user_1._id.equals(sender_id) ? user_1 : user_2;
    const receiver = user_1._id.equals(receiver_id) ? user_1 : user_2;
    return [sender, receiver, conv];
  });
};

module.exports = findConv;
