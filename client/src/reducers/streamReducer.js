import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        ...action.payload.reduce((newState, stream) => {
          newState[stream.id] = stream;
          return newState;
        }),
      };
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      const { [action.payload]: waste, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default streamReducer;
