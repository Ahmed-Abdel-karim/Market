export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_CONV":
      return action.payload;
    case "RESET_CONV":
      return action.payload;
    default:
      return state;
  }
};
