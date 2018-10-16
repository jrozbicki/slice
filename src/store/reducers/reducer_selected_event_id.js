import { SELECTED_EVENT_ID } from "../actions/event";

export default (state = "", action) => {
  switch (action.type) {
    case SELECTED_EVENT_ID:
      return action.payload;
    default:
      return state;
  }
};
