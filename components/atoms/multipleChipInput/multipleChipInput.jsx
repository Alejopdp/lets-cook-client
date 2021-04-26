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
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
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
                multiple
                id="tags-filled"
                options={props.options}
                defaultValue={[]}
                value={props.values}
                freeSolo={props.freeSolo}
                onChange={props.onChange}
                on
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="default"
                            style={{ color: "#fff" }}
                            classes={{ deleteIconColorPrimary: classes.deleteIconColorPrimary }}
                            color="primary"
                            label={option}
                            {...getTagProps({ index })}
                            onDelete={() => props.handleRemoveValue(option)}
                        />
                    ))
                }
                renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
        </FormControl>
    );
};

Input.propTypes = {
    options: PropTypes.array.isRequired,
    freeSolo: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    handleRemoveValue: PropTypes.func.isRequired,
};

export default Input;
