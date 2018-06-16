const verificationErrorReducer = (state = null, action) => {
  switch (action.type) {
    case "VERIFICATION_ERROR":
      return action.payload;
    default:
      return state;
  }
};

export default verificationErrorReducer;
