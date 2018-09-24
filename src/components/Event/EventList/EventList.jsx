import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";

import { Add, Comment } from "@material-ui/icons";

const styles = theme => ({
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  cardTitle: {
    textAlign: "center",
    marginBottom: theme.spacing.unit
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogTextField: {
    width: "100%"
  }
});

class Event extends React.Component {
  state = {
    dialogOpen: false,
    itemName: "",
    itemQuantity: 1
  };

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleSubmit = () => {
    this.setState({ dialogOpen: false, itemName: "", itemQuantity: 1 });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false, itemName: "", itemQuantity: 1 });
  };

  renderList = () => {
    if (this.props.eventData.list) {
      return Object.entries(this.props.eventData.list).map(item => {
        console.log("renderingListitem", item);
        return (
          <ListItem key={item[0]} dense button>
            <Checkbox tabIndex={-1} disableRipple />
            <Typography variant="subheading">{`${item[1].name} x ${
              item[1].quantity
            }`}</Typography>
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <Comment />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="headline" className={classes.cardTitle}>
              {this.props.eventData.name}
            </Typography>
            <List>{this.renderList()}</List>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              onClick={this.handleOpenDialog}
              variant="fab"
              color="secondary"
              aria-label="Add"
            >
              <Add fontSize="large" />
            </Button>
          </CardActions>
        </Card>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add item
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              className={classes.dialogTextField}
              autoComplete="off"
              id="name"
              label="Item name"
              type="text"
              value={this.state.itemName}
              onChange={e => this.setState({ itemName: e.target.value })}
            />
            <TextField
              id="quantity"
              className={classes.dialogTextField}
              autoComplete="off"
              label="Item quantity"
              type="number"
              value={this.state.itemQuantity}
              onChange={e => this.setState({ itemQuantity: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              disabled={
                this.state.itemName === "" || this.state.itemQuantity < 1
              }
              color="primary"
            >
              ADD ITEM TO LIST
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventData: state.eventData
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Event);
