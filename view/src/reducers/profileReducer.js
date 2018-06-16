const profileReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_INFO":
      return action.payload;
    default:
      return state;
  }
};

module.exports = profileReducer;
