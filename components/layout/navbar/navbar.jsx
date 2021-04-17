// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// External components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Hidden from "@material-ui/core/Hidden";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    width: "100vw",
    boxShadow: "none",
  },

  menuButton: {
    marginRight: 36,
  },

  menuButtonHidden: {
    display: "none",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={clsx(classes.appBar)} elevation={8}>
      <Toolbar className={classes.toolbar}>
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleOpenDrawer}
            className={clsx(classes.menuButton, props.opened && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Image src="/logo.png" alt="logo" width={82} height={28} style={{ justifySelf: "center" }} />
        <IconButton style={{ color: "transparent" }}>
          <NotificationsIcon style={{ color: "transparent" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  handleOpenDrawer: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
};

export default Navbar;
