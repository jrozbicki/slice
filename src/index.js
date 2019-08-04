import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

import './styles/style.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './store/reducers';
import Dashboard from './views/Dashboard/Dashboard';
import Login from './views/Login/Login';
import SignUp from './views/SignUp/SignUp';
import Settings from './views/Settings';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/signup" component={SignUp} />

        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
