// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useRouter } from "next/router";

// External components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Image from "next/image";
import Box from "@material-ui/core/Box";

// Internal components
import UserBoxDesktop from "./userBoxDesktop";
import UserBoxMobile from "./userBoxMobile";


const Navbar = (props) => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <AppBar position="fixed" classes={{ root: classes.appBar }}>
            <Toolbar className={classes.toolbar}>
                <Hidden mdUp>
                    <IconButton
                        edge="start"
                        color="textSecondary"
                        aria-label="open drawer"
                        onClick={props.handleOpenDrawer}
                        className={clsx(classes.menuButton, props.opened && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <div style={{cursor: 'pointer'}}>
                    <Image src="/logo.png" alt="logo" width={100} height={34} style={{ justifySelf: "center" }} onClick={() => router.push({ pathname: `/` })} />
                </div>
                <Box display="flex" alignItems="center">
                    <Hidden smDown>
                        <UserBoxDesktop />
                    </Hidden>
                    <Hidden mdUp>
                        <UserBoxMobile />
                    </Hidden>
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
