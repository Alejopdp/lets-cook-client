import React from "react";
import PropTypes from "prop-types";
import SearhIcon from "@material-ui/icons/Search";
import { makeStyles, useTheme, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        width: '50vh',
        [theme.breakpoints.down('sm')]: {
            width: '100vh'
        },
    },
}));

const SeacrhInputField = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <SearhIcon />
            <TextField
                fullWidth
                onChange={e => props.handlerOnChange && props.handlerOnChange(e.target.value)}
                placeholder={props.placeholder}
                style={{ marginLeft: theme.spacing(1) }}
            />
        </div>
    );
};

SeacrhInputField.propTypes = {
    handlerOnChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default SeacrhInputField;
