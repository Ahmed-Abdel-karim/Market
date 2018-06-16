export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER_CONVERSATIONS":
      return action.payload;
    default:
      return state;
  }
};
