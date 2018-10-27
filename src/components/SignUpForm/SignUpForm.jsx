import React, { Component } from "react";
import firebase from "../../firebase";

import {
  CssBaseline,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
  withStyles,
  TextField,
  Snackbar,
  SnackbarContent,
  IconButton
} from "@material-ui/core";

import { Error, Close } from "@material-ui/icons";

import { SignupFormWrapper, styles } from "./signupform-styles";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    openSnackbar: false,
    errorMessage: "Error"
  };

  componentWillUnmount() {
    this.setState({
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      openSnackbar: false,
      errorMessage: "Error"
    });
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(data.user));
        firebase
          .database()
          .ref("/users")
          .child(data.user.uid)
          .set({
            id: data.user.uid,
            name: this.state.name,
            email: data.user.email,
            privilages: {
              admin: false,
              user: true
            },
            defaultEventId: ""
          });
        this.props.history.push("/");
      })
      .catch(err => this.handleSnackbarOpen(err.message));
  };

  handleSnackbarOpen = errorMessage => {
    this.setState({ errorMessage: errorMessage, openSnackbar: true });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ errorMessage: "", openSnackbar: false });
  };

  render() {
    const { classes } = this.props;
    const { name, email, password, passwordRepeat } = this.state;
    return (
      <SignupFormWrapper>
        <main className={classes.layout}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography variant="headline">Signup Form</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <TextField
                  autoFocus
                  id="name"
                  name="name"
                  autoComplete="name"
                  label="Name"
                  required
                  helperText="This name will be displayed throughout the app"
                  value={name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Repeat password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={passwordRepeat}
                  onChange={e =>
                    this.setState({ passwordRepeat: e.target.value })
                  }
                />
              </FormControl>
              <Button
                fullWidth
                variant="raised"
                color="secondary"
                className={classes.submit}
                disabled={
                  name &&
                  email &&
                  password &&
                  passwordRepeat &&
                  passwordRepeat === password
                    ? false
                    : true
                }
                onClick={this.handleSignUp}
              >
                Submit
              </Button>
            </form>
          </Paper>
        </main>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.openSnackbar}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Error className={classes.icon} />
                {this.state.errorMessage}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleSnackbarClose}
              >
                <Close className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </SignupFormWrapper>
    );
  }
}

export default withStyles(styles)(SignUpForm);
