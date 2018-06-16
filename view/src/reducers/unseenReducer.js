const unseenReducer = (state = null, action) => {
  switch (action.type) {
    case "UNSEEN_MESSAGES":
      return action.payload;
    default:
      return state;
  }
};

export default unseenReducer;
