import { STREAM_LIST_OPTIONS } from "../actions/types";

const streamListOptionsReducer = (state = { showAllStreams: true }, action) => {
  switch (action.type) {
    case STREAM_LIST_OPTIONS:
      return { ...state, showAllStreams: action.payload };
    default:
      return state;
  }
};

export default streamListOptionsReducer;
