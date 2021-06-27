// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const CustomRadioGroup = (props) => {
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name={props.inputName} value={props.value} onChange={props.handleChange}>
                {props.options.map((option, index) => (
                    <FormControlLabel key={index} value={option.value} control={<Radio color="primary" />} label={option.label} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

CustomRadioGroup.propTypes = {
    inputName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })),
};

export default CustomRadioGroup;
