import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SimpleSelect = ({ name, title, value, values = [], items = [], handleChange = () => {}, ...props }) => (
    <FormControl fullWidth variant="outlined">
        {title && <InputLabel id={`${name}-select-label`}>{title}</InputLabel>}
        <Select
            labelId={title && `${name}-select-label`}
            value={value}
            name={name}
            onChange={(e) => handleChange({
                target: { 
                    name: e.target.name,
                    value: e.target.value,
                    type: 'select'
                } 
            })}
        >
            {items.map((item, key) => (
                <MenuItem key={key} value={values[key] ? values[key] : item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

SimpleSelect.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string,
    handleChange: PropTypes.func,
};

SimpleSelect.defaultValues = {
    title: undefined,
    value: undefined,
    name: undefined,
    items: [],
    handleChange: () => {},
};

export default SimpleSelect;
