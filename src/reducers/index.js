import { combineReducers } from "redux";
import CheckOutItemsReducer from "./reducer_checked_out_items";
import CurrentUserDataReducer from "./reducer_userData";
import CurrentUserEventsReducer from "./reducer_events";
import SelectedEventDataReducer from "./reducer_event_data";

const rootReducer = combineReducers({
  checkedOutItems: CheckOutItemsReducer,
  currentUserData: CurrentUserDataReducer,
  currentUserEvents: CurrentUserEventsReducer,
  eventData: SelectedEventDataReducer
});

export default rootReducer;
