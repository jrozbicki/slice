const drawerWidth = 250;

export const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflowX: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: { position: "absolute", zIndex: theme.zIndex.drawer + 1 },
  navIconHide: { [theme.breakpoints.up("md")]: { display: "none" } },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "100vh",
    [theme.breakpoints.up("md")]: { position: "relative" }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  flex: { justifyContent: "space-between" },
  formControl: { minWidth: 120 },
  title: {
    color: "white",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular
  }
});
