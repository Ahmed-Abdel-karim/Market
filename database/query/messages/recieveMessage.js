const Message = require("../../model/message");
const findConvQuery = require("../../query/conversation/findConv");
const findOrCreateConvQuery = require("../../query/conversation/findOrCreate");
const User = require("../../model/user");
const Conversation = require("../../model/conversation");

const recieveMessage = (sender_id, reciever_id, conv_id, content) => {
  return User.find({ _id: { $in: [sender_id, reciever_id] } })
    .then(users => findConvQuery(users[0], users[1], sender_id, reciever_id))
    .then(res => {
      const [sender, reciever, conv] = res;
      const message = new Message({
        content
      });
      message.conversation = conv;
      message.from = sender;
      message.to = reciever;
      reciever.messages.push(message);
      conv.messages.push(message);
      return Promise.all([message.save(), conv.save(), reciever.save()]);
    })
    .then(() =>
      Conversation.findById(conv_id).populate({
        path: "messages",
        populate: {
          path: "from",
          model: "user"
        }
      })
    )
    .catch(e => console.log(e));
};

module.exports = recieveMessage;
