import { SUBSCRIBERS_DATA } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case SUBSCRIBERS_DATA:
      return action.payload;
    default:
      return state;
  }
};
