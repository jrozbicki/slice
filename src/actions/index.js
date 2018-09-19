export const ADD_CHECKEDOUT_ITEM = "ADD_CHECKEDOUT_ITEM";
export const REMOVE_CHECKEDOUT_ITEM = "REMOVE_CHECKEDOUT_ITEM";

export const addCheckedOutItem = id => {
  return {
    type: ADD_CHECKEDOUT_ITEM,
    payload: id
  };
};

export const removeCheckedOutItem = id => {
  return {
    type: REMOVE_CHECKEDOUT_ITEM,
    payload: id
  };
};
