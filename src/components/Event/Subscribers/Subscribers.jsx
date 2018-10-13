import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Avatar,
  List,
  ListItem,
  Divider
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
  },
  listFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  userPurchaseList: {
    width: "100%"
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
    return subscribersData.map(subscriber => {
      console.log("before render subscribers", subscriber);
      return (
        <ExpansionPanel key={subscriber.id}>
          <StyledExpansionPanelSummary>
            <div className={this.props.classes.avatarAndNick}>
              <Avatar>{subscriber.name.substr(0, 1)}</Avatar>
              <Typography className={this.props.classes.heading}>
                {subscriber.name}
              </Typography>
            </div>
            <div className={this.props.classes.totalAmountDiv}>
              <Typography className={this.props.classes.totalAmount}>
                {`${
                  subscriber.events[this.props.eventData.id] &&
                  subscriber.events[this.props.eventData.id].userTotal
                    ? subscriber.events[this.props.eventData.id].userTotal
                    : 0
                } zł`}
              </Typography>
            </div>
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={this.props.classes.userPurchaseList}>
              {subscriber.events[this.props.eventData.id] &&
              subscriber.events[this.props.eventData.id].purchases
                ? this.renderSubscribersPurchasedLists(
                    subscriber.events[this.props.eventData.id]
                  )
                : null}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  renderSubscribersPurchasedLists = event => {
    return Object.entries(event.purchases).map(purchase => {
      return (
        <Fragment key={purchase[0]}>
          <List className={this.props.classes.listFlex}>
            <div>{this.renderPurchaseItems(purchase)}</div>
            <div>{`${purchase[1].price} zł`}</div>
          </List>
          <Divider />
        </Fragment>
      );
    });
  };

  renderPurchaseItems = purchase => {
    return Object.entries(purchase[1].items).map(item => {
      return (
        <ListItem key={item[1].id}>{`${item[1].name} x${
          item[1].quantity
        }`}</ListItem>
      );
    });
  };

  // componentDidMount() {
  //   if (this.props.eventData.id) {
  //     // eslint-disable-next-line
  //     this.props.eventData.users.map(userId => {
  //       console.log("comp did mount", userId);
  //       firebase
  //         .database()
  //         .ref(`/users/${userId}`)
  //         .on("value", snap => snap.val());
  //     });
  //   }
  // }

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
