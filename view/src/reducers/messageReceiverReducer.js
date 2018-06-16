const messageReceiverReducer = (state = null, action) => {
  switch (action.type) {
    case "MESSAGE_RECIEVER":
      return action.payload;
    default:
      return state;
  }
};

module.exports = messageReceiverReducer;
