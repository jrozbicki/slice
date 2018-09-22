import React from "react";
import { withRouter } from "react-router-dom";
export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (localStorage.isLoggedIn === "false") {
        this.props.history.push(`/login`);
      }
    }

    render() {
      return localStorage.isLoggedIn === "true" ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  return withRouter(AuthenticatedComponent);
}
