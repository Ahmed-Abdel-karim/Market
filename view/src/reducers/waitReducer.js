const waitReducer = (state = null, action) => {
  switch (action.type) {
    case "WAIT":
      return action.payload;
    default:
      return state;
  }
};

export default waitReducer;
