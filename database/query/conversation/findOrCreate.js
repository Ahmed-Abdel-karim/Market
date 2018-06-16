const Conversation = require("../../model/conversation");
const finConvParticipantsQuery = require("../user/findConvParticipants");

const findOrCreateConv = (sender_id, receiver_id) => {
  return Conversation.findOne({
    participants: { $all: [sender_id, receiver_id] }
  })
    .populate({
      path: "messages",
      populate: {
        path: "from",
        model: "user"
      }
    })
    .then(conv => {
      if (!!conv) {
        return conv;
      } else {
        return finConvParticipantsQuery(sender_id, receiver_id).then(res => {
          return Conversation.create({
            participants: [res[0], res[1]]
          }).then(conv => conv);
        });
      }
    });
};

module.exports = findOrCreateConv;
