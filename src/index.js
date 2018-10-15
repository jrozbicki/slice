import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./styles/style.css";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./store/reducers";
import Dashboard from "./views/Dashboard/Dashboard";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import requireAuth from "./components/HOC/RequireAuth/requireAuth";
import thunk from "redux-thunk";
import logger from "redux-logger";
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={requireAuth(Dashboard)} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
