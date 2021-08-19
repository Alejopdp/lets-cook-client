// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";

// Internal components

const useStyles = makeStyles((theme) => ({
    margin: {
        // marginBottom: theme.spacing(2),
        // marginTop: theme.spacing(2),
    },
    textField: {
        width: "100%",
    },
    deleteIconColorPrimary: {
        color: theme.palette.text.secondary,
    },
}));

const Input = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <Autocomplete
                style={{ marginBottom: theme.spacing(2) }}
                multiple
                options={props.options.filter((option) => props.values.every((value) => value !== option))}
                defaultValue={[]}
                value={props.values}
                freeSolo={props.freeSolo}
                onChange={props.onChange}
                disableClearable={props.disableClearable}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="default"
                            style={{ color: "#fffff" }}
                            classes={{ deleteIconColorPrimary: classes.deleteIconColorPrimary }}
                            color="primary"
                            label={option}
                            {...getTagProps({ index })}
                            onDelete={() => props.handleRemoveValue(option)}
                        />
                    ))
                }
                renderInput={(params) => <TextField {...params} variant="outlined" label={props.label} />}
            />
        </FormControl>
    );
};

Input.propTypes = {
    options: PropTypes.array.isRequired,
    freeSolo: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleRemoveValue: PropTypes.func.isRequired,
    disableClearable: PropTypes.bool,
};

export default Input;
