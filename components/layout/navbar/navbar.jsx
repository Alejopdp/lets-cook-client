// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useStyles } from "./styles";

// External components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Image from "next/image";
import Box from "@material-ui/core/Box";

// Internal components
import UserBox from "./userBox";

const Navbar = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" classes={{ root: classes.appBar }}>
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
                <Box display="flex" alignItems="center">
                    <UserBox />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

Navbar.propTypes = {
    handleOpenDrawer: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
};

export default Navbar;
