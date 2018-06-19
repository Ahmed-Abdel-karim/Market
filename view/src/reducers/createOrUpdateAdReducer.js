const createOrUpdateAdReducer = (state = null, action) => {
  switch (action.type) {
    case "CREATE_AD":
      return action.payload || false;
    case "UPDATE_AD":
      return action.payload || false;
    case "RESET_ADS":
      return action.payload;
    default:
      return state;
  }
};

export default createOrUpdateAdReducer;
