// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// Internal components

const CustomCheckbox = (props) => {
    return (
        <FormControlLabel
            control={
                <Checkbox checked={props.checked} value={props.value} onChange={props.handleChange} color="primary" name={props.name} />
            }
            label={props.label}
        />
    );
};

CustomCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default CustomCheckbox;
