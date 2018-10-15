import { withStyles, ExpansionPanelSummary } from "@material-ui/core";

export const StyledExpansionPanelSummary = withStyles({
  content: {
    justifyContent: "space-between"
  }
})(ExpansionPanelSummary);

export const styles = theme => ({
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
