import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import firebase from "../../../firebase";
import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => console.log(err.message));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(user));
        this.props.history.push("/dashboard");
      }
    });

    this.setState({ email: "", password: "" });
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => console.log(err.message));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(user));

        firebase
          .database()
          .ref("/users")
          .child(user.uid)
          .set({
            email: user.email,
            privilages: {
              admin: false,
              user: true
            }
          });

        this.props.history.push("/dashboard");
      }
    });

    this.setState({ email: "", password: "" });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormControl>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleSignIn}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.handleSignUp}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SignIn));
