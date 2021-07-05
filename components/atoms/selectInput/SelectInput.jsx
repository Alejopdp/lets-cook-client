// Utils & Config
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

// External components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: "100%",
            marginBottom: theme.spacing(2)
        },
    },
}));

const SelectInput = (props) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id={props.id}
                name={props.name}
                select
                label={props.label}
                value={props.value}
                onChange={props.handleChange}
                variant="outlined"
            >
{                    props.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </TextField>
        </form>
    );
}

SelectInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object)
    // ({
    //     value: PropTypes.string,
    //     label: PropTypes.string
    // })
}

export default SelectInput;