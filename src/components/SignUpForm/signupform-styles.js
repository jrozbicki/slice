import styled from "styled-components";

export const SignupFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefefe;
  width: 100vw;
  height: 100vh;
`;

export const styles = theme => ({
  layout: {
    width: "auto",
    display: "block",
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
    padding: `${
      theme.spacing.unit * 2 // Fix IE11 issue.
    }px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  form: { width: "100%", marginTop: theme.spacing.unit },
  submit: { marginTop: 20, marginBottom: 10 },
  error: { backgroundColor: theme.palette.error.dark },
  icon: {
    backgroundColor: theme.palette.error.dark,
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: { display: "flex", alignItems: "center" }
}); // Fix IE11 issue.
