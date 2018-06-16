const adsReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_ADS":
      return action.payload || false;
    case "DELETE_AD":
      return action.payload;
    case "RESET_ADS":
      return action.payload;
    default:
      return state;
  }
};

export default adsReducer;
