// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

// External components
import Button from "@material-ui/core/Button";

// Internal components

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

const CustomButton = (props) => {
    const classes = useStyles();

    return (
        <Button
            classes={{ root: classes.root }}
            variant={props.variant || "contained"}
            size={props.size}
            disabled={props.disabled}
            onClick={props.onClick}
            fullWidth={props.fullWidth}
            startIcon={props.startIcon}
        >
            {props.children}
        </Button>
    );
};

CustomButton.propTypes = {
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
    variant: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
};

export default CustomButton;
