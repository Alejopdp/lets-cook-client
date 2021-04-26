import React from "react";
import PropTypes from "prop-types";
import SearhIcon from "@material-ui/icons/Search";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({    
    root: {
        display: "flex",
        alignItems: "center",
    },
}));

const SeacrhInputField = ({ handlerOnChange }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SearhIcon />
            <TextField 
                fullWidth
                onChange={ e => handlerOnChange && handlerOnChange(e.target.value) }
                placeholder="Buscar por nombre o SKU..." 
                />
        </div>
    );
};

SeacrhInputField.propTypes = {
    handlerOnChange: PropTypes.func,
};

export default SeacrhInputField;
