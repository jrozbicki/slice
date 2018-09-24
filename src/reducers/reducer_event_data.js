import { SELECTED_EVENT_DATA } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SELECTED_EVENT_DATA:
      return action.payload;
    default:
      return state;
  }
};
