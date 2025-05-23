// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTheme } from "@material-ui/core";

// Internal components

const FreeSoloAutocomplete = (props) => {
    const theme = useTheme();

    return (
        <Autocomplete
            freeSolo
            options={props.options}
            value={props.value}
            disabled={props.disabled}
            disableClearable={props.disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    // style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}
                    variant="outlined"
                    value={props.value}
                    onChange={props.handleChange}
                    disabled={props.disabled}
                />
            )}
        />
    );
};

FreeSoloAutocomplete.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string.isRequired, value: PropTypes.string.isRequired })),
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default FreeSoloAutocomplete;
