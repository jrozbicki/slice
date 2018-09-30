import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "../../firebase";
import { compose } from "recompose";
import { connect } from "react-redux";
import { currentUserData, currentUserEvents } from "../../actions";

import { LoginFormWrapper } from "./styles";
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
  },
  signUpText: {
    marginTop: 20,
    textAlign: "center"
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "" };
  }

  componentWillUnmount() {
    this.setState({ email: "", password: "" });
  }

  handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => console.log(err.message));
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        sessionStorage.setItem("userData", JSON.stringify(user));
        sessionStorage.setItem("isLoggedIn", true);
        this.props.history.push("/");
      } else {
        //TODO: handle error case -> SNACKBAR
      }
    });
  };

  handleSignUp = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { classes } = this.props;
    return (
      <LoginFormWrapper>
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
              <Typography variant="subheading" className={classes.signUpText}>
                Don't have account? Sign up below!
              </Typography>
              <Button
                fullWidth
                variant="raised"
                color="secondary"
                className={classes.submit}
                onClick={this.handleSignUp}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </main>
      </LoginFormWrapper>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { currentUserData, currentUserEvents }
  )
)(LoginForm);
