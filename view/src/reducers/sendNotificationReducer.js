const sendNotificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SEND_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

export default sendNotificationReducer;
