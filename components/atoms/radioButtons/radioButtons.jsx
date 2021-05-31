import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useState } from "react";
import useStyles from "./styles";

const RadioButtons = ({ name, useBool=false, items = [], value, handleOnChange = () => {}, ...props }) => {
    const classes = useStyles();
    const [selection, setSelection] = useState();
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={name} name={name} value={value} onChange={handleOnChange}>
                {items.map((item, index) => (
                    <div key={index}>
                        <FormControlLabel
                            value={item.value}
                            control={
                                <Radio
                                    onChange={(e) => setSelection(e.target.value)}
                                    color="primary"
                                />
                            }
                            label={ useBool ? <b>{item.label}</b>: item.label}
                        />
                        {item.subtitle && (
                            <div className={classes.subtitle}>
                                <Typography>{item.subtitle}</Typography>
                            </div>
                        )}
                        {item.children && selection === item.value && <div className={clsx(classes.spacing, classes.subtitle)}>{item.children}</div>}
                    </div>
                ))}
            </RadioGroup>
        </FormControl>
    );
};

RadioButtons.propTypes = {
    name: PropTypes.string,
    useBool: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
            subtitle: PropTypes.string,
            children: PropTypes.element,
        })
    ),
    value: PropTypes.string,
    handleOnChange: PropTypes.func,
};

RadioButtons.defaultValues = {
    items: [],
    useBool: false,
    handleOnChange: () => {},
};

export default RadioButtons;
