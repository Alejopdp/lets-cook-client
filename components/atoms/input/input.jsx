// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

// Internal components

const useStyles = makeStyles((theme) => ({
    margin: {
        marginBottom: theme.spacing(2),
    },
    textField: {
        width: "100%",
    },
}));

const Input = (props) => {
    const classes = useStyles();
    return (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <TextField
                name={props.name}
                label={props.label}
                variant="outlined"
                type={props.type}
                onChange={props.handleChange}
                value={props.value}
                multiline={props.multiline || false}
                rows={props.rows || 1}
                {...props.customProps}
            />
        </FormControl>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.any.isRequired,
    rows: PropTypes.number,
    multiline: PropTypes.bool,
    customProps: PropTypes.any
};

export default Input;
