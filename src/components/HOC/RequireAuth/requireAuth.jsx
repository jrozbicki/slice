import React from "react";
import { withRouter } from "react-router-dom";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if (
        sessionStorage.getItem("isLoggedIn") === "false" ||
        sessionStorage.getItem("isLoggedIn") === null
      ) {
        this.props.history.push(`/login`);
      }
    }

    render() {
      return sessionStorage.getItem("isLoggedIn") === "true" ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  return withRouter(AuthenticatedComponent);
}
