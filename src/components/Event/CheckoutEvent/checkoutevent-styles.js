import { withStyles, ExpansionPanelSummary } from "@material-ui/core";

export const StyledExpansionPanelSummary = withStyles({
  content: {
    justifyContent: "space-between"
  }
})(ExpansionPanelSummary);

export const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  heading: {
    display: "flex",
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: theme.spacing.unit,
    alignItems: "center"
  },
  singleTransaction: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 2fr",
    padding: 0,
    "&:last-child": {
      paddingRight: 0
    }
  },
  arrowIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  transactionValue: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular
  },
  accNumberContainer: {
    display: "flex",
    justifyContent: "center"
  },
  accNumber: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: theme.typography.fontWeightRegular
  },
  from: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular
  },
  to: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular
  },
  avatarAndNick: {
    display: "flex"
  },
  listItemDetails: {
    padding: 3,
    paddingLeft: 24
  }
});
