// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core"

// External components
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CustomAutocomplete(props) {
    const theme = useTheme();
    return (
        <Autocomplete
            options={props.options}
            getOptionLabel={(option) => option.title || option}
            renderInput={(params) => <TextField name={props.name} {...params} label={props.label} variant="outlined" />}
            fullWidth={props.fullWidth}
            onChange={(e, option) => props.onChange(props.name, option ? option.value : "")}
            disableClearable={props.disableClearable}
            value={props.value}
            style={{ marginBottom: theme.spacing(2) }}
        // inputValue={props.value}
        />
    );
}

CustomAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, value: PropTypes.string })),
    fullWidth: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disableClearable: PropTypes.bool,
};
