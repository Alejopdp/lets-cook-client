// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

// Internal components

const RoundedCheckbox = (props) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    checked={props.checked}
                    value={props.value}
                    onChange={props.onChange}
                    color="primary"
                    name={props.name}
                />
            }
            label={props.label}
        />
    );
};

RoundedCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
};

export default RoundedCheckbox;
