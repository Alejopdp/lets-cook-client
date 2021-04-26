// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function CustomAutocomplete(props) {
    return (
        <Autocomplete
            options={props.options}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
            fullWidth={props.fullWidth}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

CustomAutocomplete.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, value: PropTypes.string })),
    fullWidth: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
