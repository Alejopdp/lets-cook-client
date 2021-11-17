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
                defaultValue={props.defaultValue}
                multiline={props.multiline || false}
                rows={props.rows || 1}
                helperText={props.helperText}
                {...props.customProps}
                onWheel={(e) => e.target.blur()}
            />
        </FormControl>
    );
};

Input.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    helperText: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.any.isRequired,
    rows: PropTypes.number,
    multiline: PropTypes.bool,
    defaultValue: PropTypes.any,
    customProps: PropTypes.any,
};

export default Input;
