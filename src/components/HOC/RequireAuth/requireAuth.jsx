import React from "react";
import { withRouter } from "react-router-dom";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (
        localStorage.getItem("isLoggedIn") === "false" ||
        localStorage.getItem("isLoggedIn") === null
      ) {
        this.props.history.push(`/login`);
      }
    }

    render() {
      return localStorage.getItem("isLoggedIn") === "true" ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  return withRouter(AuthenticatedComponent);
}
