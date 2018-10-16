import { combineReducers } from "redux";
import CurrentUserDataReducer from "./reducer_user";
import CurrentUserEventsReducer from "./reducer_user_events";
import SelectedEventDataReducer from "./reducer_event";
import SubscribersDataReducer from "./reducer_subscribers";
import SelectedEventIdReducer from "./reducer_selected_event_id";

const appReducer = combineReducers({
  currentUserData: CurrentUserDataReducer,
  currentUserEvents: CurrentUserEventsReducer,
  eventData: SelectedEventDataReducer,
  subscribersData: SubscribersDataReducer,
  selectedEventId: SelectedEventIdReducer
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
