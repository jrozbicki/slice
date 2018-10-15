import { CURRENT_USER_EVENTS } from "../actions/user";

export default (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_EVENTS:
      return action.payload;
    default:
      return state;
  }
};
