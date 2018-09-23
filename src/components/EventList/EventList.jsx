import React from "react";
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
  withStyles
} from "@material-ui/core";

import { Add } from "@material-ui/icons";

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="headline" className={classes.cardTitle}>
              pl. Zgody
            </Typography>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
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

export default withStyles(styles)(Event);
