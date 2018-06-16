const userReducer = (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload || false;
    case "ADD_FAV_AD":
      return action.payload;
    case "REMOVE_FAV_AD":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
