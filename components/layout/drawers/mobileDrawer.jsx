// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import { useHistory } from "react-router-dom";
import Image from "next/image";

import { useRouter } from "next/router";

// External components
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

// Internal components
import ItemListWithIcon from "../../molecules/itemListWithIcon/itemListWIthIcon";

// Icons & Images

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.fourthColor,
    },
    appBarSpacer: theme.mixins.toolbar,
}));

const MobileDrawer = (props) => {
    const classes = useStyles();
    // const history = useHistory();
    const routes = useRouter();
    const handleOptionClick = (path) => {
        props.onClose();
        // history.push(path);
        routes.push(path);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="temporary"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
                onClose={props.onClose}
            >
                {/* <div className={classes.appBarSpacer} /> */}
                <Box display="flex" justifyContent="center" alignItems="center" paddingTop={2}>
                    <Image src="/logo.png" alt="logo" width={82} height={28} style={{ margin: "auto" }} layout="fixed" />
                </Box>

                <List>
                    {props.sidebarOptions.map((item, index) => (
                        <ItemListWithIcon
                            text={item.text}
                            key={index}
                            index={index}
                            icon={item.icon}
                            handleOptionClick={() => handleOptionClick(item.path)}
                        />
                    ))}
                </List>
            </Drawer>
        </div>
    );
};

MobileDrawer.propTypes = {
    sidebarOptions: PropTypes.array.isRequired,
};

export default MobileDrawer;
