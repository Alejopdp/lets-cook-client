import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import CustomCheckbox from "../checkbox/checkbox";
import useStyles from "./styles";

const CheckboxList = ({ items = [], handleOnChange = () => {}, ...props }) => {
    const classes = useStyles();
    const [selection, setSelection] = useState(Array(items.length).fill(false));
    return (
        <>
            {items.map((item, index) => (
                <div key={index}>
                    <CustomCheckbox
                        label={item.label}
                        value={item.value}
                        name={item.name}
                        checked={item.checked}
                        handleChange={(e) => {
                            const newState = [...selection];
                            newState[index] = e.target.checked;
                            setSelection(newState);
                            handleOnChange(item);
                        }}
                    />
                    {item.subtitle && (
                        <div className={classes.subtitle}>
                            <Typography>{item.subtitle}</Typography>
                        </div>
                    )}
                    {item.children && selection[index] && <div className={clsx(classes.spacing, classes.subtitle)}>{item.children}</div>}
                </div>
            ))}
        </>
    );
};

CheckboxList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.any,
            value: PropTypes.string,
            name: PropTypes.string,
            checked: PropTypes.bool,
            subtitle: PropTypes.string,
            children: PropTypes.element,
        })
    ),
    handleOnChange: PropTypes.func,
};

CheckboxList.defaultValues = {
    items: [],
    handleOnChange: () => {},
};

export default CheckboxList;
