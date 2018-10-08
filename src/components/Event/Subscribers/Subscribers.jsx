import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    display: "flex",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: theme.spacing.unit,
    alignItems: "center"
  },
  summary: {
    display: "flex",
    justifyContent: "space-between"
  },
  avatarAndNick: {
    display: "flex"
  },
  totalAmountDiv: {
    display: "flex",
    alignItems: "center",
    "&:last-child": {
      paddingRight: 0
    }
  },
  totalAmount: {
    display: "flex",
    alignItems: "center",
    color: "green",
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular
  }
});

const StyledExpansionPanelSummary = withStyles({
  content: {
    justifyContent: "space-between"
  }
})(ExpansionPanelSummary);

class Subscribers extends Component {
  renderSubscribers = () => {
    const { subscribersData } = this.props;
    console.log(subscribersData);
    return subscribersData.map(subscriber => {
      return (
        <ExpansionPanel key={subscriber.id}>
          <StyledExpansionPanelSummary>
            <div className={this.props.classes.avatarAndNick}>
              <Avatar>U</Avatar>
              <Typography className={this.props.classes.heading}>
                {subscriber.name}
              </Typography>
            </div>
            <div className={this.props.classes.totalAmountDiv}>
              <Typography className={this.props.classes.totalAmount}>
                {`${
                  subscriber.events[this.props.eventData.id].userTotal
                    ? subscriber.events[this.props.eventData.id].userTotal
                    : 0
                } zł`}
              </Typography>
            </div>
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  componentDidMount() {
    if (this.props.eventData.id) {
      this.props.eventData.users.map(userId => {
        firebase
          .database()
          .ref(`/users/${userId}`)
          .once("value")
          .then(snap => {
            console.log(snap.val());
          });
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.props.eventData.name && this.props.subscribersData.length
          ? this.renderSubscribers()
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscribersData: state.subscribersData
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Subscribers);
