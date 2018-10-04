import { combineReducers } from "redux";
import CheckOutItemsReducer from "./reducer_checked_out_items";
import CurrentUserDataReducer from "./reducer_userData";
import CurrentUserEventsReducer from "./reducer_events";
import SelectedEventDataReducer from "./reducer_event_data";
import SubscribersDataReducer from "./reducer_subscribers_data";

const appReducer = combineReducers({
  checkedOutItems: CheckOutItemsReducer,
  currentUserData: CurrentUserDataReducer,
  currentUserEvents: CurrentUserEventsReducer,
  eventData: SelectedEventDataReducer,
  subscribersData: SubscribersDataReducer
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
