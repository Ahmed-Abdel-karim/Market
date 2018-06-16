const flashMessageReducer = (state = null, action) => {
  switch (action.type) {
    case "ERROR":
      return action.payload;
    case "RESET_FLASH_MESSAGE":
      return action.payload;
    case "MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export default flashMessageReducer;
