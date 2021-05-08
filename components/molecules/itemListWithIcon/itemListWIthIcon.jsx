// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Icon from "@material-ui/core/Icon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useRouter } from "next/router";

// Exeternal components

// Internal components

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.fourthColor,
        minWidth: "40px",
    },
    selected: {
        color: "green",
    },
}));

const ItemListWIthIcon = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const { palette } = useTheme();

    const isItemSelected = () => {
        // return location.pathname === props.path;
        // console.log("ROUTER PATHNAME: ", router.query.dashboard);
        // console.log("PROPS PATH: ", props.path);
        // return router.query.dashboard.some((query) => `/${query.toUpperCase()}` === props.path.toUpperCase());
        return false;
    };

    return (
        <ListItem button key={props.text} onClick={props.handleOptionClick}>
            <CssBaseline />
            <Icon className={classes.icon} style={{ color: isItemSelected() ? palette.fifthColor : palette.fourthColor }}>
                {props.icon}
            </Icon>
            <ListItemText primary={props.text} style={{ color: isItemSelected() ? palette.primaryColor : palette.text.secondary }} />
        </ListItem>
    );
};

ItemListWIthIcon.propTypes = {
    text: PropTypes.string,
    index: PropTypes.number,
    icon: PropTypes.func,
    handleOptionClick: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
};

export default ItemListWIthIcon;
