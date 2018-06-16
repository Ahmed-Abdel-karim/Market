const currentConvReducer = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_CONV":
      return action.payload;
    case "RESET_CONV":
      return action.payload;
    default:
      return state;
  }
};

module.exports = currentConvReducer;
