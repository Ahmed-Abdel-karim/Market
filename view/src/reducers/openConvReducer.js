const openConvReducer = (state = null, action) => {
  switch (action.type) {
    case "OPEN_CONV":
      return action.payload;
    case "RESET_CONV":
      return action.payload;
    default:
      return state;
  }
};

module.exports = openConvReducer;
