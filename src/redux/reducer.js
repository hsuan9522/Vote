import initState from "./state";

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "SAVE_VOTES": {
      return {
        ...state,
        votes: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;
