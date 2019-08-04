import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../firebase';
import { compose } from 'recompose';

import { LoginFormWrapper, styles } from './loginform-styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  componentWillUnmount() {
    this.setState({ email: '', password: '' });
  }

  handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => console.log(err.message));
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', true);
        this.props.history.push('/');
      }
    });
  };

  handleSignUp = () => {
    this.props.history.push('/signup');
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

export default compose(withStyles(styles))(LoginForm);
