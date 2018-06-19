const app = require("./app");
const socket = require("socket.io");
const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`listining on port ${port}`));
const addCommentQuery = require("./database/query/comments/addCommnet");
const findAdsQuery = require("./database/query/ad/findAds");
const findUserQuery = require("./database/query/user/findUser");
const findOrCreateConvQuery = require("./database/query/conversation/findOrCreate");
const recieveMessageQuery = require("./database/query/messages/recieveMessage");
const finConvParticipantsQuery = require("./database/query/user/findConvParticipants");
const updateMessagesQuery = require("./database/query/messages/updateMessages");
const validator = require("validator");
const io = socket(server);

io.on("connection", socket => {
  socket.on("commentList", _id => {
    if (validator.isMongoId(_id)) {
      findAdsQuery(null, _id).then(ad => {
        if (!!ad) {
          const { comments } = ad;
          socket.emit("commentList", comments);
        }
      });
    }
  });

  socket.on("comment", ({ comment, ad_id, user_id }) => {
    Promise.all([findAdsQuery(null, ad_id), findUserQuery(user_id)])
      .then(res => addCommentQuery(comment, res[0], res[1]))
      .then(ad => {
        const { comments } = ad;
        io.emit("comment", { ad_id, comments });
      })
      .catch(e => console.log(e));
  });

  socket.on("messageList", ({ sender_id, receiver_id }) => {
    findOrCreateConvQuery(sender_id, receiver_id)
      .then(conv => {
        socket.emit("messageList", conv);
      })
      .catch(e => console.log(e));
    finConvParticipantsQuery(sender_id, receiver_id)
      .then(users => {
        const user =
          sender_id.toString() === users[0]._id.toString()
            ? users[0]
            : users[1];
        const friend =
          receiver_id.toString() === users[0]._id.toString()
            ? users[0]
            : users[1];
        return updateMessagesQuery(user, friend);
      })
      .catch(e => console.log(e));
  });

  socket.on("message", ({ sender_id, receiver_id, conv_id, content }) => {
    recieveMessageQuery(sender_id, receiver_id, conv_id, content).then(conv => {
      io.emit("message", { conv });
    });
  });
  socket.on("update_message", ({ _id }) => {
    console.log("try to update message");

    updateMessagesQuery(null, null, _id).catch(e => console.log(e));
  });
});

module.exports = server;
