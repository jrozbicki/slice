import { combineReducers } from "redux";
import CheckOutItemsReducer from "./reducer_checked_out_items";

const rootReducer = combineReducers({
  checkedOutItems: CheckOutItemsReducer
});

export default rootReducer;
