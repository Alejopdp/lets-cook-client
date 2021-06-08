// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

// External components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

// Internal components

const RoundedCheckbox = (props) => {
    const theme = useTheme();

    return (
        <FormControlLabel style={{marginBottom: theme.spacing(1)}}
            control={
                <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleCheckedFilled />}
                    color="primary"
                    checked={props.checked}
                    onChange={props.onChange}
                />
            }
            label={props.label}
        />
    );
};

RoundedCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default RoundedCheckbox;
