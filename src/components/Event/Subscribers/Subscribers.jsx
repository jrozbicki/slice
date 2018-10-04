import React, { Component, Fragment } from "react";
import { compose } from "recompose";

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
    return (
      <Fragment>
        <ExpansionPanel>
          <StyledExpansionPanelSummary>
            <div className={this.props.classes.avatarAndNick}>
              <Avatar>U</Avatar>
              <Typography className={this.props.classes.heading}>
                User1
              </Typography>
            </div>
            <div className={this.props.classes.totalAmountDiv}>
              <Typography className={this.props.classes.totalAmount}>
                20,50 zł
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
        <ExpansionPanel>
          <StyledExpansionPanelSummary>
            <div className={this.props.classes.avatarAndNick}>
              <Avatar>U</Avatar>
              <Typography className={this.props.classes.heading}>
                User1
              </Typography>
            </div>
            <div className={this.props.classes.totalAmountDiv}>
              <Typography className={this.props.classes.totalAmount}>
                20,50 zł
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
        <ExpansionPanel>
          <StyledExpansionPanelSummary>
            <div className={this.props.classes.avatarAndNick}>
              <Avatar>U</Avatar>
              <Typography className={this.props.classes.heading}>
                User1
              </Typography>
            </div>
            <div className={this.props.classes.totalAmountDiv}>
              <Typography className={this.props.classes.totalAmount}>
                20,50 zł
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
      </Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.renderSubscribers()}</div>;
  }
}

export default compose(withStyles(styles))(Subscribers);
