const iState = {
  // state data of home component is now here
  text: "",
  mywishes: [{ _id: 1, wish: "loading" }] // some dummy data prev set
};

const reducer = (state = iState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT": // updating React's i/p case (check action creator page)
      return {
        ...state,
        text: action.payload
      };

    case "GET_WISH": // fetching this from Component Did Mount
      return {
        ...state,
        mywishes: action.payload
      };

    case "ADD_WISH": // fetching this from Component Did Mount
      return {
        ...state,
        mywishes: [...state.mywishes, action.payload]
      };

    case "DELETE_WISH": // fetching this from Component Did Mount
      const newwishes = this.props.mywishes.filter(item => {
        return item._id !== action.payload.id; // return id which is not equal to passed id
      });
      return {
        ...state,
        mywishes: [newwishes]
      };

    default:
      return state;
  }

  /* if (action.type === "UPDATE_INPUT") {
    return {
      ...state,
      text: action.payload
    };
  }
  return state; */
};

export default reducer;
