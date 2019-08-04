import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/isAuthenticated';

const PrivateRoute = props =>
  isAuthenticated() ? <Route {...props} /> : <Redirect to="/login" />;

export default PrivateRoute;
