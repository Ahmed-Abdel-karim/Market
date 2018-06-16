const User = require("../../model/user");

const findConvParticipants = (sender_id, receiver_id) =>
  User.find({ _id: { $in: [sender_id, receiver_id] } });

module.exports = findConvParticipants;
