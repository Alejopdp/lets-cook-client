import PropTypes from "prop-types";
import clsx from "clsx";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import CustomCheckbox from "../checkbox/checkbox";
import useStyles from "./styles";

type CheckboxListProps = {
    items: {
        label: any;
        value: number;
        name: string;
        checked: boolean;
        subtitle: string | undefined;
        children: any | undefined;
    }[];
    handleOnChange: (item: any) => void;
};

const CheckboxList = ({ items = [], handleOnChange = () => {}, ...props }: CheckboxListProps) => {
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

export default CheckboxList;
