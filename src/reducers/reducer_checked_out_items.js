import { ADD_CHECKEDOUT_ITEM, REMOVE_CHECKEDOUT_ITEM } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_CHECKEDOUT_ITEM:
      return [action.payload, ...state];
    case REMOVE_CHECKEDOUT_ITEM:
      const afterRemoving = state.filter(obj => {
        return obj !== action.payload;
      });
      return afterRemoving;
    default:
      return state;
  }
};
