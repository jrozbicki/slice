import { CURRENT_USER_DATA } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_DATA:
      return action.payload;
    default:
      return state;
  }
};
